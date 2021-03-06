// Imports
const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
    const deployer = (await getNamedAccounts()).deployer;
    const fundMe = await ethers.getContract("FundMe", deployer);

    console.log("Got contract from: ", fundMe.address);

    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.02"),
    });
    await transactionResponse.wait();
    console.log("Funded!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
