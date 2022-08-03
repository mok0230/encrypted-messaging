//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// simple messenger app that stores all data on-chain
// in practice, this is probably not ideal as it will 
// get expensive to do anything interesting and the 
// solidity data structures are not ideal for this 
// type of storage
// but this kind of seems like the hello world of 
// encrypted messaging

contract OnChainMessengerV3 is Pausable, Ownable {
  mapping(address => Message) public messages;
  bool public someBool;

  event Error(address sender);

  struct Message {
    address sender;
    string content;
  }

  function changeBool(bool _newBool) public {
    someBool = _newBool;
  }

  function sendMessage(address recipient, string memory message) public whenNotPaused {
    messages[recipient] = Message(msg.sender, message);
  }

  function throwError() public {
    emit Error(msg.sender);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
