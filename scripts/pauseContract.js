const { ethers } = require("ethers");
require("dotenv").config();
const messengerJson = require("../artifacts/contracts/OnChainMessengerV2.sol/OnChainMessengerV2.json")

// using V2 implementation contract address as owner() is set to 0x0... in proxy contract, which prevents pausing
const MESSENGER_ADDRESS = "0x8b66D8AE164F20D86B5Dee4A1cc35602c9f654D3";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

(async function main(signer) {
  const onChainMessenger = new ethers.Contract(MESSENGER_ADDRESS, messengerJson.abi, signer);

  console.log('owner', await onChainMessenger.owner())

  await onChainMessenger.pause();

  return { success: true };
})(wallet);
