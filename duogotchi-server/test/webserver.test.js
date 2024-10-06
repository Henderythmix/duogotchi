// File: test/webserver.test.js
// Description:
// - Test cases for the Webserver

describe('WebServer', () => {
  var aliceKey, bobKey;
  
  test('Login GET Request Alice', async () => {
    let testRequest = new Request('http://localhost:3000/POST/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'alice',
        password: '1234'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let message;
    await fetch(testRequest).then(response => response.json())
    .then(data => {
      console.log(data);
      aliceKey = data.accessToken;

      message = data.message;
    });

    expect(message).toBe('Login successful');
  })

  test('Login GET Request Bob', async () => {
    let testRequest = new Request('http://localhost:3000/POST/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'bob',
        password: '1234'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let message;
    await fetch(testRequest).then(response => response.json())
    .then(data => {
      console.log(data);
      bobKey = data.accessToken;

      message = data.message;
    });

    expect(message).toBe('Login successful');
  })

  test('Link Alice and Bob', async () => {
    let aliceRequest = new Request('http://localhost:3000/POST/linkPartner', {
      method: 'POST',
      body: JSON.stringify({
        username: 'alice',
        partner: 'bob',
        accessToken: aliceKey
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let bobRequest = new Request('http://localhost:3000/POST/linkPartner', {
      method: 'POST',
      body: JSON.stringify({
        username: 'bob',
        partner: 'alice',
        accessToken: bobKey
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let messages = ["", "", ""];

    await fetch(aliceRequest).then(response => response.json())
    .then(data => {
      console.log(data);

      messages[0] = data.message;
    });
    
    await fetch(bobRequest).then(response => response.json())
    .then(data => {
      console.log(data);

      messages[1] = data.message;
    });

    aliceRequest = new Request('http://localhost:3000/POST/linkPartner', {
      method: 'POST',
      body: JSON.stringify({
        username: 'alice',
        partner: 'bob',
        accessToken: aliceKey
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await fetch(aliceRequest).then(response => response.json())
    .then(data => {
      console.log(data);

      messages[2] = data.message;
    });

    expect(messages[0]).toBe('Request sent successfully');
    expect(messages[1]).toBe('Partners linked successfully');
    expect(messages[2]).toBe('Partner already exists');
  });

  test("Get Alice's Pet", async () => {
    let testRequest = new Request('http://localhost:3000/GET/getPet?username=alice&token=' + aliceKey);

    let message;
    await fetch(testRequest).then(response => response.json())
    .then(data => {
      console.log(data);
      
      message = data.message;
    });

    expect(message).toBe('Pet Found Successfully');
  });

  test("Attend Alice's Partner's Pet", async () => {
    let testRequest = new Request('http://localhost:3000/POST/updatePet', {
      method: 'POST',
      body: JSON.stringify({
        username: 'alice',
        partner: 'true',
        action: 'attend',
        accessToken: aliceKey
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let pet;
    await fetch(testRequest).then(response => response.json()).then(data => {
      console.log(data);
      pet = data.pet;
    });

    expect(pet.attention).toBe(100);
  });

  test("Get Alice's Partner's Pet", async () => {
    let testRequest = new Request('http://localhost:3000/GET/getPet?username=alice&partner=true&token=' + aliceKey);

    let output;
    await fetch(testRequest).then(response => response.json())
    .then(data => {
      console.log(data);
      
      output = data;
    });

    expect(output.message).toBe('Pet Found Successfully');
    expect(output.pet.attention).toBeGreaterThan(output.pet.hunger);
  })

  test("Get Bob's Pet", async () => {
    let testRequest = new Request('http://localhost:3000/GET/getPet?username=bob&token=' + bobKey);

    let output;
    await fetch(testRequest).then(response => response.json()).then(data => {
      console.log(data);
      
      output = data;
    });

    expect(output.message).toBe('Pet Found Successfully');
    expect(output.pet.attention).toBeGreaterThan(output.pet.hunger);
  });
})