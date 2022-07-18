const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

// Running staging test is the last step before deploying to production
// These tests are run on testnet (rinkeby here)
developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let deployer;
          let fundMe;
          const sendValue = ethers.utils.parseEther("0.02");
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue });
              const transactionResponse = await fundMe.withdraw();
              const transactionReceipt = await transactionResponse.wait(1);

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              );
              assert.equal(endingFundMeBalance.toString(), "0");
          });
      });
