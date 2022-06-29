//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    // Overriding store function
    function store(uint256 _number) public override{
        myInt256 = _number;
    }
}