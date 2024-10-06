const User = require('./user');
const Pet = require('./pet');

var users = {
    "alice": new User('alice', '1234', new Pet()),
    "bob": new User('bob', '1234', new Pet())
}

var linkingRequests = {}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
//app.use('/', bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static('src/dist'));

// express to dist/index.html
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/pet', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/linker', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

// REST API //

app.get('/GET/getPet', (req, res) => {
   let userPet = users[req.query.username].pet;
   
   if (req.query.partner == 'true')
       userPet = users[req.query.username].getPartner(req.query.token).pet;

   userPet.Update();

   res.send({
        "pet": {
            'hunger': userPet.hunger,
            'sleep': userPet.sleep,
            'attention': userPet.attention,
            'age': userPet.getAge(),
        },
       'message': "Pet Found Successfully"
   });
});

app.post('/POST/login', (req, res) => {
    console.log(req.body);
    console.log(`User ${req.body.username} is trying to log in`)
    let user = users[req.body.username];
    let loginKey = user.loginUser(req.body.password)

    if (loginKey != null) {
        res.json({
            'accessToken': loginKey,
            'message': "Login successful"
        });
    } 
    
    res.status(401).send();
});

app.get('/GET/getPair', (req, res) => {
    if (users[req.query.username].verifyToken(req.query.accessToken) == false)
        return res.send({ 'message': 'Invalid Access Token' });
    res.send({
        'username': users[req.query.username],
        'partner': users[req.query.username].getPartner(req.query.accessToken) || null,
        'message': "User Found Successfully"
    });
})

app.post('/POST/linkPartner', (req, res) => {
    // first see if the user already has a partner
    console.log(req.body);
    if (users[req.body.username].getPartner(req.body.accessToken))
        return res.json({
            "message": "Partner already exists"
        })

    // check to make sure request is not made yet
    if (linkingRequests[req.body.username])
        return res.json({
            "message": "Request already sent"
        })

    // now check to see if the user you want to link with is already requesting to link
    if (linkingRequests[req.body.partner]) {
        users[req.body.partner].linkPartner(users[req.body.username]);
        users[req.body.username].linkPartner(users[req.body.partner]);
    
        // delete the request
        delete linkingRequests[req.body.partner];
        return res.json({
            "message": "Partners linked successfully"
        });
    }
        
    // append to linking requests
    linkingRequests[req.body.username] = req.body.partner;
    return res.json({
        "message": "Request sent successfully"
    });
});

app.post('/POST/updatePet', (req, res) => {
    if (users[req.body.username].verifyToken(req.body.accessToken) == false)
        return res.send({ 'message': 'Invalid Access Token' });

    let userPet = users[req.body.username].pet;
   
    if (req.query.partner == 'true')
        userPet = users[req.partner.username].getPartner(req.query.token).pet;

    userPet.Update();

    switch(req.body.action) {
        case 'feed':
            userPet.Feed(10);
            break;
        case 'attend':
            userPet.Attend();
            break;
        case 'rest':
            userPet.Rest();
            break;
    }

    if (req.body.partner == 'true')
        users[req.body.username].getPartner(req.body.accessToken).pet = userPet;
    else
        users[req.body.username].pet = userPet;

    return res.send({
        "pet": {
            'hunger': userPet.hunger,
            'sleep': userPet.sleep,
            'attention': userPet.attention,
            'age': userPet.getAge(),
        },
        'message': "Pet Updated Successfully"
    });
});

app.listen(3000, () => {
    console.log('Server Backend started on port 3000');
});

