const { ethers, run, network } = require("hardhat");
const { assert } = require("chai");
require("dotenv").config();

describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage;

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async function () {
        const favoriteNumber = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(favoriteNumber.toString(), expectedValue);
    });

    it("Should update the favorite number", async function () {
        const newValue = 10;
        await simpleStorage.store(newValue);
        const favoriteNumber = await simpleStorage.retrieve();
        assert.equal(favoriteNumber.toString(), newValue.toString());
    });

    it("Should have the favorite number updated to 10", async function () {
        const newValue = 10;
        await simpleStorage.store(newValue);
        const expectedValue = "10";
        const favoriteNumber = await simpleStorage.retrieve();
        assert.equal(favoriteNumber.toString(), expectedValue);
    });

    it("Should add a person in the person array", async function () {
        const newPerson = "John Doe";
        const expectedValue = "John Doe";
        await simpleStorage.addPerson(newPerson, 10);
        const personArray = await simpleStorage.retrievePerson(0);
        assert.equal(personArray.name, expectedValue);
    });
});
