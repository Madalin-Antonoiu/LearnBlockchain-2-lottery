// We will esentially write almost identical code to inbox.test.js file

// Imports
require('dotenv').config(); // able to use process.env file
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Variables
let SPENDER;
const provider = new HDWalletProvider(
    process.env.WALLET_SEEDPHRASE, // Any Eth account mnemonic can be used, MetaMask for this example
    process.env.INFURA_RINKEBY_TESTNET_API_KEY
);
// console.log(provider);

const web3 = new Web3(provider);

// Main function
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    SPENDER = accounts[0]; // Using the third account in the list, the one i decided to fund with Eth

    console.log('Attempting to deploy from account', SPENDER);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode }) //careful to include [] for arguments
        .send({ gas: '1000000', from: SPENDER })

    console.log('Contract deployed to', `https://rinkeby.etherscan.io/address/${result.options.address}`);
    //rinkeby.etherscan.io , change this with etherscan.io for mainnet
}

// Run
deploy();
