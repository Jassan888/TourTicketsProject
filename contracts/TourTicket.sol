pragma solidity ^0.7.3;

contract TourTicket{
    
    enum level{regular, veryImportantPeople}
     level purchaseLevel;
    
    address payable public owner;
    uint public ticketPrice;
    
    constructor()public{
        
        owner= msg.sender;
        ticketPrice= 2 ether;
        
        purchaseLevel= level.regular;
    }
    
    modifier statusLevel{
        require(purchaseLevel== level.regular,'Regular tier ticket prices only.');
        _;
    }
    
    function musicGroup()pure public returns(string memory){
        return("The Hives Live , One night only!");
    }
    
    function showTime()pure public returns(string memory){
        return("Show time starts at 5pm");
    }
    
    function payment()payable public statusLevel{
        require(msg.value >= 2 ether,'The ticket must be paid in full.');
        owner.transfer(msg.value);
    }
}