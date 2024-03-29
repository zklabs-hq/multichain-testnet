const express = require('express');
const Web3 = require("web3");
var cors = require('cors')

const app = express();
const appPort = process.env.PORT;

// For parsing application/json
app.use(express.json());

app.use(cors())
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const chainPortMap = {
  'ethereum': 8545,
  'optimism': 8550,
  'arbitrum': 8555,
  'polygon': 8560
}

app.post('/getETH', async (req, res) => {
  const { chain, accountAddress } = req.body;
  const chainPort = chainPortMap[chain];
  try {
    const transResp = await transferFundsToUserWallet(chain, chainPort, accountAddress);
    res.status(202).json(transResp);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(appPort, () => {
  console.log(`Multichain Testnet listening on port ${appPort}`);
});

async function transferFundsToUserWallet(chain, port, recieverAddress) {
  const network = `http://${chain}-testnet-rpc:${port}`;
  const web3 = new Web3(new Web3.providers.HttpProvider(network));
  const senderData = {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  };
  let nonce = await web3.eth.getTransactionCount(senderData.address);
  const senderBalanceWei = await web3.eth.getBalance(senderData.address);
  const senderBalanceEth = web3.utils.fromWei(senderBalanceWei, "ether");
  if (senderBalanceEth < 0.5) {
    console.error(senderBalanceEth);
    throw new Error('not enough funds');
  }

  const signRes = await web3.eth.accounts.signTransaction({
    to: recieverAddress,
    value: web3.utils.toWei(0.5.toString(), 'ether'),
    gas: 21000,
  }, senderData.privateKey);
  console.info(signRes);

  const trans = await web3.eth.sendSignedTransaction(signRes.rawTransaction);
  console.info(trans);
  return trans;
}