# multichain-testnet
Multichain Testnet which has a weak correlation with the mainnet

Motivation - 

## Setup

### Get Mainnet nodes
Alchemy
### Docker
Install Docker - https://docs.docker.com/get-docker/

### Repo Setup
```
$ git clone https://github.com/zklabs-hq/multichain-testnet.git

$ cd multichain-testnet

$ vim .env
```
#### `.env`
Create a `.env` file at the root of the project folder, using your favourite text editor and copy the following code in the file

```
HOST=0.0.0.0
SVC_PORT=3000

ETHEREUM_MAINNET_ARCHIVE_NODE=<RPC for Ethereum Mainnet archive node>
ETHEREUM_CHAIN_ID=31337
ETHEREUM_PORT=8545

OPTIMISM_MAINNET_ARCHIVE_NODE=<RPC for Optimism Mainnet archive node>
OPTIMISM_CHAIN_ID=31338
OPTIMISM_PORT=8550

ARBITRUM_MAINNET_ARCHIVE_NODE=<RPC for Arbitrum Mainnet archive node>
ARBITRUM_CHAIN_ID=31339
ARBITRUM_PORT=8555

POLYGON_MAINNET_ARCHIVE_NODE=<RPC for Polygon Mainnet archive node>
POLYGON_CHAIN_ID=31340
POLYGON_PORT=8560
```
## Running Services

### Local Testnet
```
$ docker-compose up
```

### Service

```
$ cd svc

$ npm install

$ PORT=3000 node index.js
```

### Block Explorer
Start this at PORT 3001
```
$ cd expedition

$ npm install

$ npm start
```

### UI (Faucet)
```
$ cd ui/app

$ npm install

$ npm start
```