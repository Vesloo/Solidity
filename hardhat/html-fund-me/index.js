import { ethers } from "./imports/ethers.js";
import { abi, contractAddress } from "./imports/constants.js";

const { ethereum } = window;
const connectButton = document.querySelector(".connect");
const showButton = document.querySelector(".show-account");
const fundButton = document.querySelector(".fund");
const balanceButton = document.querySelector(".balance");
const withdrawButton = document.querySelector(".withdraw");

// Connect to the blockchain
async function connect() {
    if (ethereum.isMetaMask) {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
        } catch (err) {
            console.log(err);
        }
        connectButton.innerHTML = `Connected`;
        showButton.style.display = "block";
        withdrawButton.style.display = "block";
        fundButton.style.display = "block";
        balanceButton.style.display = "block";
    } else {
        connectButton.innerHTML = `Please install MetaMask`;
    }
}

// Fund the contract
async function fund() {
    const ethAmount = document.querySelector("#eth-amount").value;
    console.log("Funding " + ethAmount + " ETH");
    if (ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount.toString()),
            });
            await listenTransactionMine(transactionResponse, provider);
            console.log("Done !");
        } catch (err) {
            console.log(err);
        }
    }
}

async function getBalance() {
    if (ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log("Balance: " + ethers.utils.formatEther(balance));
        return ethers.utils.formatEther(balance);
    }
}

async function withdraw() {
    if (ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transactionResponse = await contract.withdraw();
            await listenTransactionMine(transactionResponse, provider);
            console.log("Done !");
        } catch (err) {
            console.log(err);
        }
    }
}

// Listen for transaction to be mined
function listenTransactionMine(transactionResponse, provider) {
    console.log("Mining " + transactionResponse.hash);

    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                "Transaction mined: " + transactionReceipt.confirmations
            );
            // Call the resolve function so this will wait for the code to be executed
            resolve();
        });
    });
}

async function showAccount() {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    const showText = document.querySelector(".show-text");

    showText.innerHTML = `Account: ${account}`;
    return account;
}

connectButton.addEventListener("click", connect);
fundButton.addEventListener("click", fund);
showButton.addEventListener("click", showAccount);
balanceButton.addEventListener("click", getBalance);
withdrawButton.addEventListener("click", withdraw);
