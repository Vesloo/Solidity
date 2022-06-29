//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./PriceConverter.sol";

error notOwner();
error notSent();

contract FundMe {
    using PriceConverter for uint256;

    // constant, immutable variable
    // Declaring constants and immutable instead of normal variables reduces the gas cost of the contract.
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address public immutable i_owner;
    address[] public funders;
    uint256 public nbFunders = 0;
    uint256 public ticket = 0;

    mapping(address => uint256) public funderToTicket;
    mapping(address => uint256) public addressToAmountFunded;

    // Set the owner of the contract
    constructor () {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= MINIMUM_USD, "Didn't send enough");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
        nbFunders++;
        createTicket();
    }

    function createTicket() public {
            ticket += 1;
            funderToTicket[msg.sender] = ticket;
    }

    function withdraw() public onlyOwner {
        for (uint256 i; i < funders.length; i++)
        {
            // Reset the balance of each funder to 0 in the mapping
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
            funderToTicket[funder] = 0;
        }
        //Reset the array
        funders = new address[](0);
        nbFunders = 0;
        ticket = 0;
        //Withdraw the funds using call
        //transfer, send, call are 3 differents ways to send money
        (bool sent,) = payable(msg.sender).call{value: address(this).balance}("");
        // require(sent, "Not sent");
        if (!sent) {
            revert notSent();
        }
    }

    modifier onlyOwner {
        //require(msg.sender == i_owner, "Sender is not owner");
        // Reduce the gaz fee of the contract
        if (msg.sender != i_owner) {
            revert notOwner();
        }
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}