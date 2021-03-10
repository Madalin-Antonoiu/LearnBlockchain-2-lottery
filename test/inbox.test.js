const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts, inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    //1. Get list of accounts from Ganache
    accounts = await web3.eth.getAccounts();

    //2. Deploy a contract using one account
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    })

    // Read-only method
    it('has a default message', async () => {
        //string public message; from Inbox.sol is providing this message() function
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, INITIAL_STRING);
    })

    // Modify method
    it('can change the message', async () => {
        const value = 'Adios, amigos!';

        await inbox.methods.setMessage(value).send({ from: accounts[0] });
        // have this person pay for sending the change into the network
        // it does return like a 'receipt' if i do const receipt = await...

        const message = await inbox.methods.message().call();
        assert.strictEqual(message, value)// if it was correctly set, then it should be ===
    })

})