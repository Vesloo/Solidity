// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    address myAddress = 0x7EbEAddeF1f4498A06fcE61bd532B816DeA12431;
    bool myBool = true;
    uint256 public myInt256;

    int256 myInt = -1;
    uint256 myUint = 1;

    string myString = "Hello World!";

    bytes32 myByte = "cat";

    People[] public myPeople;

    mapping(string => uint256) public nameToAge;

    struct People {
        string name;
        uint256 age;
    }

    function store(uint256 _number) public virtual {
        myInt256 = _number;
    }

    function retrieve() public view returns (uint256) {
        return myInt256;
    }

    function addPerson(string memory _name, uint256 _age) public {
        People memory newPerson;
        newPerson.name = _name;
        newPerson.age = _age;
        myPeople.push(newPerson);
        nameToAge[_name] = _age;
    }

    function retrievePerson(uint256 offset)
        public
        view
        returns (People memory)
    {
        return myPeople[offset];
    }
}
