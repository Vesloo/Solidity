# How to setup the project

## Get started

-   To get started follow this list of instructions:

```shell
git clone https://github.com/Vesloo/Vesloo.git
cd Vesloo/solidity/hardhat/fund-me
yarn install
```

## Compile

-   Next, compile the contract (SimpleStorage.sol)

```shell
yarn hardhat compile
```

## Deploy the contract

-   Create the .env file and add RINKEBY_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY and COINMARKETCAP_API_KEY to work with rinkeby
-   Run this command below to deploy the contract on rinkeby

```shell
yarn hardhat deploy --network rinkeby
```

-   You can also deploy the contract on hardhat local network with mocks

```shell
yarn hardhat deploy --tags mocks
```

## Verify the contract on etherscan

-   The deploy script verify the contract automatically, you just need to provide ETHERSCAN_API_KEY in your .env file

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

-   Unit tests are done locally
-   Staging tests are done on testnets (rinkeby, ropsten, kovan...)
-   To run a test, run this command:

```shell
yarn hardhat test
```

## Clean artifacts and cache

-   Run this command to clean the cache and artifacts folders

```shell
yarn hardhat clean
```

## Run coverage

```shell
yarn hardhat coverage
```
