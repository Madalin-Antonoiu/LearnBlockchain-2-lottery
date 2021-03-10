const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom'
    }
}

let car;

beforeEach(() => {// This runs beforeEach it() inside describe()
    car = new Car();
})
describe('Car Class', () => {
    it('park()', () => {
        assert.strictEqual(car.park(), 'stopped')
    })
    it('drive()', () => {
        assert.strictEqual(car.drive(), 'vroom');
    })
});

//npm run test will execute these. Remember to add "mocha" for test: inside package.json