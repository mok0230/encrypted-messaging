require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
    goerli: {
      url: `${process.env.ALCHEMY_GOERLI_URL}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
      
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  } 
};