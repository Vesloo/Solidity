# How to setup the project

## Get started

-   To get started follow this list of instructions:

```shell
git clone https://github.com/Vesloo/Vesloo.git
cd Vesloo/solidity/hardhat/hardhat-simple-storage
yarn install
```

## Compile

-   Next, compile the contract (SimpleStorage.sol)

```shell
yarn hardhat compile
```

## Deploy the contract

-   Create the .env file and add RINKEBY_RPC_URL, PRIVATE_KEY and ETHERSCAN_API_KEY to work with rinkeby
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

## Verify the contract on etherscan

-   This is optional because the deploy script do it automatically
-   Copy the smart contract address from the console and run:

```shell
yarn hardhat verify --network <network> <DEPLOYED_CONTRACT_ADDRESS>
```

## Hardhat special tasks

-   There is one special task:

```shell
yarn hardhat block-number --network rinkeby
```

## Clean the cache and artifacts folder

-   Run this command to clean the cache and artifacts folder

```shell
yarn hardhat clean
```

## Run tests

-   To run a test, run this command:

```shell
yarn hardhat test
```

## Clean artifacts and cache

-   Run this command to clean the cache and artifacts folder

```shell
yarn hardhat clean
```

<!-- yarn hardhat accounts
yarn hardhat compile
yarn hardhat clean
yarn hardhat test
yarn hardhat node
node scripts/sample-script.js
yarn hardhat help -->
