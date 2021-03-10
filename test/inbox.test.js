const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

// Declare it outside of beforeEach to be global 
let accounts;

beforeEach(async () => {
    //1. Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //2. Use one acc. to deploy the contract
})

describe('Inbox Contract', () => {
    it('logs a list of fetched accounts', () => {
        console.log(accounts);
    })
})