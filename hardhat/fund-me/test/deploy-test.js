const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("FundMe", function () {
    let fundMe, fundMeFactory;
    beforeEach(async function () {
        fundMeFactory = await ethers.getContractFactory("FundMe");
        fundMe = await fundMeFactory.deploy();
    });
    it("should update the nbFunders variable when someone fund", async function () {
        let nbFunders = await fundMe.nbFunders();
        const newValue = 1;
        await fundMe.fund(20000000);
        nbFunders = await fundMe.getNbFunders();
        assert.equal(nbFunders.toString(), newValue.toString());
    });
});
