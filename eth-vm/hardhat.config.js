/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 31339,
      forking: {
        url: process.env.RPC,
        host: process.env.HOST,
        port: process.env.PORT
      }
    }
  },
  solidity: "0.8.4",
};