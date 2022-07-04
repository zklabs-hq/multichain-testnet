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

(async () => {
  try {
    await resetNetwork();
  } catch (error) {
    console.error(error);
  }
})();