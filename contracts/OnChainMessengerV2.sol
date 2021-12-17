//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// simple messenger app that stores all data on-chain
// in practice, this is probably not ideal as it will 
// get expensive to do anything interesting and the 
// solidity data structures are not ideal for this 
// type of storage
// but this kind of seems like the hello world of 
// encrypted messaging

contract OnChainMessengerV2 is Initializable, Pausable {
  address owner;

  mapping(address => Message) public messages;

  struct Message {
    address sender;
    string content;
  }

  function initialize() public initializer {
    owner = msg.sender;
  }

  function sendMessage(address recipient, string memory message) public {
    messages[recipient] = Message(msg.sender, message);
  }
}
