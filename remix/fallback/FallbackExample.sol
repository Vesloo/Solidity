//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FallbackExample {
    uint256 public result;
    address public immutable i_owner;

    // Receive function is called when a transaction is received.
    receive() external payable {
        result = 1;
    }

    //  Fallback is called when a function is not defined.
    fallback() external payable {
        result = 2;
    }

    constructor() {
        i_owner = msg.sender;
    }
}