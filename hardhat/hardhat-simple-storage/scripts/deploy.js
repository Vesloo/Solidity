const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying SimpleStorage...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log("SimpleStorage deployed at", simpleStorage.address);

    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    } else {
        console.log(
            "Skipping verification: not on rinkeby or no etherscan api key provided"
        );
    }
    const currentValue = await simpleStorage.retrieve();
    console.log("Current value:", currentValue.toString());

    const transactionResponse = await simpleStorage.store(10);
    await transactionResponse.wait(1);
    const newValue = await simpleStorage.retrieve();
    console.log("New value:", newValue.toString());
}

// Verify the smart contract on etherscan.io
async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Contract already verified");
        } else {
            console.log(error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
