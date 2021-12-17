//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// simple messenger app that stores all data on-chain
// in practice, this is probably not ideal as it will 
// get expensive to do anything interesting and the 
// solidity data structures are not ideal for this 
// type of storage
// but this kind of seems like the hello world of 
// encrypted messaging

contract OnChainMessenger {
  mapping(address => Message) public messages;

  struct Message {
    address sender;
    string message;
  }

  constructor() { }

  function sendMessage(address recipient, string memory message) public {
    messages[recipient] = Message(msg.sender, message);
  }
}
