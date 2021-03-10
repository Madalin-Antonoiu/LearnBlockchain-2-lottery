const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

beforeEach(() => {
    //1. Get a list of all accounts
    web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts);
        })

    //2. Use one to deploy the contract
})

describe('Inbox Contract', () => {
    it('logs a list of fetched accounts', () => { })
})