// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// EVM means Ethereum Virtual Machine
// EVM compatibles blockchains are: Avalanche, Fantom, Polygon
// It means we can run solidity code on these blockchains

contract SimpleStorage {
    // Boolean, int, uint, address, string, bytes, uint256, int256
    // The default value of int is 0, uint is 0, uint256 is 0, int256 is 0
    address myAddress = 0x7EbEAddeF1f4498A06fcE61bd532B816DeA12431;
    bool myBool = true;

    // This int8's value is 0
    // The different visibility of the variable is: public, private, internal, external
    // Public makes it visible to the outside
    uint256 public myInt256;

    // int and uint are multiple of 8 bits
    int256 myInt = -1;
    uint256 myUint = 1;

    // String is a sequence of bytes
    string myString = "Hello World!";

    // 32 is the maxiumum length of byte
    bytes32 myByte = "cat";

    // Create an array of People
    People[] public myPeople;

    // Create mapping of people to their age
    mapping(string => uint256) public nameToAge;

    // Create new type
    struct People {
        string name;
        uint256 age;
    }

    function store(uint256 _number) public virtual {
        myInt256 = _number;
    }

    // View and pure functions don't spend gas
    function retrieve() public view returns (uint256) {
        return myInt256;
    }

    // Create a function that add people
    // calldata, memory, storage
    // calldata is constant data stored to the contract and cannot be changed
    // memory is not constant stored in the contract and can be changed
    // storage stay after the contract is destroyed
    function addPerson(string memory _name, uint256 _age) public {
        People memory newPerson;
        newPerson.name = _name;
        newPerson.age = _age;
        myPeople.push(newPerson);
        nameToAge[_name] = _age;
    }
}
