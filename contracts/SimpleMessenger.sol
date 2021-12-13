//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SimpleMessenger {
  mapping(address => Message[]) public messages;
  mapping(address => int) public messageCount;

  struct Message {
    address sender;
    string message;
  }

  constructor() { }

  function sendMessage(address recipient, string memory message) public {
    messages[recipient].push(Message(msg.sender, message));
    messageCount[recipient] += 1;
  }
}
