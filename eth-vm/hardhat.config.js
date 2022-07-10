/**
 * @type import('hardhat/config').HardhatUserConfig
 */
var cron = require('node-cron');

async function resetNetwork() {
  const res = await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: process.env.RPC,
          url: process.env.RPC,
          host: process.env.HOST,
          port: process.env.PORT
        },
      },
    ],
  })
  console.log(res);
}

cron.schedule('* * 0 0 SUN', async () => {
  console.log('Resetting Network');
  await resetNetwork();
});

module.exports = {
  networks: {
    hardhat: {
      chainId: parseInt(process.env.CHAIN_ID),
      forking: {
        url: process.env.RPC,
      }
    }
  },
  solidity: "0.8.4",
};