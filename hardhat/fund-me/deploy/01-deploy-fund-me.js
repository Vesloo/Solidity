// import
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
// function deployFunc() {
//     console.log("hi");
// }

// module.exports.default = deployFunc;

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre;
// };

// or
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    // When going for localhost or hardhat network, we want to use a mock
    const args = [ethUsdPriceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // Put price feed address here
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }

    log("----------------------------------------------------");

    // for (let i = 0; i < 10; i++) {
    //     log(
    //         `Location ${i}: ${await ethers.provider.getStorageAt(
    //             fundMe.address,
    //             i
    //         )}`
    //     );
    // }
};

module.exports.tags = ["all", "fund-me"];
