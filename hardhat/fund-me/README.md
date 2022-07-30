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

-   the 'all' tag is used to verify if the contract is deployed with mocks (local network)

```shell
yarn hardhat deploy --tags all
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
-   To run a unit test, run this command:

```shell
yarn hardhat test
```

-   Run a specific test
-   You can see tests names in tests files

```shell
yarn hardhat test --grep "<test name>"
```

-   To run a staging test, run this command:

```shell
yarn hardhat test --network rinkeby
```

## Run coverage

```shell
yarn hardhat coverage
```

## Run scripts

-   There are two scripts:

```shell
yarn hardhat run scripts/fund.js
yarn hardhat run scripts/withdraw.js
```
