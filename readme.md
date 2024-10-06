# Duogotchi


## Build Instructions
node.js and npm is required to build this project

```sh
cd duogotchi-vue
npm install
npm run build

cd ../duogotchi-server
npm install
docker compose up
```

### Deployment
For the hackathon we use Defang to deploy. `defang compose up`