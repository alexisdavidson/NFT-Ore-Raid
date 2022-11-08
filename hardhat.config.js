require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
     hardhat: {},
     goerli: {
       url: process.env.REACT_APP_API_URL_GOERLI,
       accounts: ['0x' + process.env.REACT_APP_PRIVATE_KEY_GOERLI],
       allowUnlimitedContractSize: true,
       gas: 2100000,
       gasPrice: 12000000000,
     },
     mainnet: {
       url: process.env.REACT_APP_API_URL_MAINNET,
       accounts: [process.env.REACT_APP_PRIVATE_KEY_MAINNET],
       gas: 2100000,
       gasPrice: 16000000000
     }
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY
    // apiKey: process.env.REACT_APP_POLYGONSCAN_API_KEY
  }
};
