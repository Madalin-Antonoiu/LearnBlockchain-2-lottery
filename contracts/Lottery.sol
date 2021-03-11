pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;  // take the address of whoever deploys this contract and assign it to manager var
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    
    function pseudoRandom() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
        
    }
    
    function pickWinner() public restricted {
        uint index = pseudoRandom() % players.length;
        players[index].transfer(this.balance); //0xh2383hd etc... , sends all ether from current contract lottery
        players = new address[](0); //create new dynamic array of type address, esentially resetting state of app
    }
    
    //Dont repeat yourself thing :)
    modifier restricted(){
        require(msg.sender == manager);  //enfornce nobody can call this except the person who created this contract, the manager
        _;
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
    
    
}