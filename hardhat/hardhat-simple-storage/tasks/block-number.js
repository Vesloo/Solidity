const { task } = require("hardhat/config");

task("block-number", "prints the current block number").setAction(
    async (taskArg, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(blockNumber);
    }
);

module.exports = {};
