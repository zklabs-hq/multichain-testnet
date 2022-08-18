const { network } = require("hardhat");

async function resetNetwork() {
  const res = await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: process.env.RPC
        },
      },
    ],
  })
  console.log(res);
}

async function takeSnapshot() {
  const res = await network.provider.request({
    method: 'evm_snapshot'
  });
  console.log(res);
}

(async () => {
  try {
    // await resetNetwork();
    await takeSnapshot();
  } catch (error) {
    console.error(error);
  }
})();