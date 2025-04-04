/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const {
    crossfiTestnetParams,
} = require("./evm-contracts/chains/crossfiChain.js");
const {
    baseSepoliaParams,
} = require("./evm-contracts/chains/baseChain.js");

module.exports = {
    solidity: {
        version: "0.8.28",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },

    paths: {
        sources: "./evm-contracts/contracts",
        tests: "./evm-contracts/test",
        cache: "./evm-contracts/cache",
        artifacts: "./evm-contracts/artifacts",
    },
    networks: {
        // crossfi: {
        //     url: "https://rpc.testnet.ms/",
        //     chainId: 4157,
        //     accounts: [process.env.ACCOUNT_1, process.env.ACCOUNT_2],
        // },

        crossfiTestnet: crossfiTestnetParams([process.env.NEXT_PUBLIC_ACCOUNT_1]),
        baseSepolia: baseSepoliaParams([process.env.NEXT_PUBLIC_ACCOUNT_1]),
    },

    mocha: {
        timeout: 200000,  // Increase timeout if needed
    },
};