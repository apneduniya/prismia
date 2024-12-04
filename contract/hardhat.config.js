require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox")

// best for verifying on open-campus
// TERMINAL COMMAND: bun hardhat verify --network edu-chain-testnet 0xD75Bb8354f27e9476a87524ad152864656b2199d 0x17Ad46C3C8AF35c79995014173Bf263DD14d0A22 0x17Ad46C3C8AF35c79995014173Bf263DD14d0A22
// For more: https://devdocs.opencampus.xyz/build/smart-contracts/verify-contracts
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


// best for deploying on open-campus
// TERMINAL COMMAND: bunx hardhat run scripts/deploy.js --network opencampus
// For more: https://devdocs.opencampus.xyz/build/smart-contracts/deploy-using-hardhat

// module.exports = {
//   solidity: "0.8.28",
//   paths: {
//     artifacts: "./src",
//   },
//   networks: {
//     opencampus: {
//       url: `https://rpc.open-campus-codex.gelato.digital/`,
//       accounts: [process.env.ACCOUNT_PRIVATE_KEY],
//     },
//   },
//   etherscan: {
//     apiKey: {
//       opencampus: "your-etherscan-api-key",
//     },
//     customChains: [
//       {
//         network: "opencampus",
//         chainId: 656476,
//         urls: {
//           apiURL: "https://opencampus-codex.blockscout.com/api",
//           browserURL: "https://opencampus-codex.blockscout.com",
//         },
//       },
//     ],
//   },
// };