require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox")


module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "./src",
  },
  networks: {
    'edu-chain-testnet': {
      url: 'https://rpc.open-campus-codex.gelato.digital'
    },
  },
  etherscan: {
    apiKey: {
      'edu-chain-testnet': 'empty'
    },
    customChains: [
      {
        network: "edu-chain-testnet",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://edu-chain-testnet.blockscout.com"
        }
      }
    ]
  }
};