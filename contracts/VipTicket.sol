pragma solidity ^0.7.3;

contract VipTickets{

     enum level{regular, veryImportantPeople}
     level purchaseLevel;

    address payable public owner;
    uint public ticketPrice;

    string[]public merchandise=["Collectable T-Shrt" ," Vinyl Record", "Collectable Signed Poster"];

    constructor()public{
        owner= msg.sender;
        
        ticketPrice= 4 ether;
        
        purchaseLevel= level.veryImportantPeople;

    }

    function purchase() payable public {
      require(msg.value >= 4 ether, "Must pay V.I.P. ticket in full.");
      owner.transfer(msg.value);

    }
}