const { ethers } = require("ethers");
require("dotenv").config();
const messengerJson = require("../artifacts/contracts/OnChainMessengerV2.sol/OnChainMessengerV2.json")

const MESSENGER_ADDRESS = "0x2fA45418BFF5cd9172a88988E229679140A1fa12";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

(async function main() {
  const onChainMessenger = new ethers.Contract(MESSENGER_ADDRESS, messengerJson.abi, wallet);

  await onChainMessenger.throwError();

  return { success: true };
})();
