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
        it("Should update the ticket number", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.ticket();
            assert.equal(response.toString(), "1");
        });
        it("Should add a funder in the funders array", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.funders(0);
            assert.equal(response, deployer);
        });
        it("should call receive function");
    });
    describe("withdraw", async () => {
        let owner;
        beforeEach(async () => {
            owner = await getNamedAccounts().deployer;
            await fundMe.fund({ value: sendValue });
        });
        it("Should withdraw the funds", async () => {
            // 1. Arrange
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            );
            // 2. Act
            const transactionResponse = await fundMe.withdraw();
            const transactionReceipt = await transactionResponse.wait(1);
            const { gasUsed, effectiveGasPrice } = transactionReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);
            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            );
            // 3. Assert
            assert.equal(endingFundMeBalance, 0);
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            );
        });
    });
});
