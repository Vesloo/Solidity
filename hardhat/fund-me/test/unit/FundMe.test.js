const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", async () => {
    let fundMe;
    let mockV3Aggregator;
    const sendValue = ethers.utils.parseEther("0.1");
    let deployer;

    beforeEach(async () => {
        // Deploy our fundMe contract
        // Using hardhat-deploy
        // const accounts = await ethers.getSigners();
        // const accountZero = accounts[0];
        // Same as this:
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe", deployer);
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        );
    });

    describe("constructor", async () => {
        it("Should set the Aggregator addresses correctly", async () => {
            const response = await fundMe.priceFeed();
            assert.equal(response, mockV3Aggregator.address);
        });
    });

    describe("fund", async () => {
        it("Should revert an error if the amount of ether is not enough", async () => {
            await expect(fundMe.fund()).to.be.reverted;
        });
        it("Should update the amount funded data structure", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.addressToAmountFunded(deployer);
            assert.equal(response.toString(), sendValue.toString());
        });
        it("Should update the number of funders", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.nbFunders();
            assert.equal(response.toString(), "1");
        });
    });
});
