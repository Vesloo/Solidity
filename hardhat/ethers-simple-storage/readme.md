# Simple Storage without

## Get started

-   To get started follow this list of instructions:

```
git clone https://github.com/Vesloo/Vesloo.git
cd Vesloo/solidity/hardhat/ethers-simple-storage
yarn install
```

## Deploy

-   Be sure to create and fill the .env file with your own values.
-   PRIVATE_KEY, RPC_URL and PASSWORD (the url of the provider) are required .

```
yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```

Or

```
yarn compile
```

## Security check

Next step, encrypt your private key using PASSWORD you specified earlier.

```
node encryptedKey.js
```

-   After that, delete PRIVATE_KEY from .env file.
-   Do
-   You can delete PASSWORD from the .env file too and pass it in params like this:

```
PASSWORD=<your password> node deploy.js
```

```
node deploy.js
```
