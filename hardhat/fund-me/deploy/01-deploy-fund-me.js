// import

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

    // When going for localhost or hardhat network, we want to use a mock
};
