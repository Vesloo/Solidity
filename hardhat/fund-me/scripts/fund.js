// Imports
const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
    const fundMe = await ethers.getContract("FundMe", deployer);
    const deployer = (await getNamedAccounts()).deployer;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
