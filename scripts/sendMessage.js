const { ethers } = require("ethers");
require("dotenv").config();

const MESSENGER_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "messages",
    "outputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const MESSENGER_ADDRESS = "0x2fA45418BFF5cd9172a88988E229679140A1fa12";

const MESSAGE_RECIPIENT = "0x105363009CD3155De857AE1c5B59Ba770e1aBA19";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);
// wallet.connect(provider);
// const signer = provider.getSigner("0x1b5251158a60AEEbf7736bc070C47c897c41aEde");
// provider.connection(wallet);

const logMessage = (messageType, sender, recipient, content) => {
  console.log('*************************');
  console.log(`${messageType}:`);
  console.log(`sender: ${sender}`);
  console.log(`recipient: ${recipient}`);
  console.log(`content: ${content}`);
}

(async function main(signer) {
  const onChainMessenger = new ethers.Contract(MESSENGER_ADDRESS, MESSENGER_ABI, signer);

  const existingMessage = await onChainMessenger.messages(MESSAGE_RECIPIENT);

  logMessage('existing message', existingMessage.sender, MESSAGE_RECIPIENT, existingMessage.content);

  const newMessage = `The time is now: ${Date.now()}`;

  await onChainMessenger.sendMessage(MESSAGE_RECIPIENT, newMessage);

  logMessage('new message', await signer.getAddress(), MESSAGE_RECIPIENT, newMessage);

  return { success: true };
})(wallet);
