const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts, inbox;

beforeEach(async () => {
    //1. Get list of accounts from Ganache
    accounts = await web3.eth.getAccounts();

    //2. Deploy a contract using one account
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox Contract', () => {
    it('deploys a contract', () => {
        // If the contract is successfully deployed, we should get a valid adress.
        assert.ok(inbox.options.address);
        //console.log(inbox.options.address);
    })
})