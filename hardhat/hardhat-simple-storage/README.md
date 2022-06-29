# How to setup the project

-   To get started follow this list of instructions:

```
git clone https://github.com/Vesloo/Vesloo.git
cd Vesloo/solidity/hardhat/hardhat-simple-storage
yarn install
```

-   Next, compile the contract (SimpleStorage.sol)

```shell
hardhat compile
```

-   Set the .env file by adding RINKEBY_RPC_URL to work with rinkeby
-   Run this command below to deploy the contract on rinkeby

```shell
yarn hardhat run scripts/deploy.js --network rinkeby
```

-   You can also deploy the contract on hardhat local network

```shell
yarn hardhat run scripts/deploy.js
```

-   Or

```shell
node scripts/deploy.js
```

<!-- yarn hardhat accounts
yarn hardhat compile
yarn hardhat clean
yarn hardhat test
yarn hardhat node
node scripts/sample-script.js
yarn hardhat help -->
