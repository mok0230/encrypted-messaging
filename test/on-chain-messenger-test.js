const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("OnChainMessenger", function () {
  let senderAddr, content, message;

  before(async () => {
    const deployer = await ethers.provider.getSigner(0);
    const sender = await ethers.provider.getSigner(1);
    const recipient = await ethers.provider.getSigner(2);

    senderAddr = await sender.getAddress();
    recipientAddr = await recipient.getAddress();
    content = "foo";

    const OnChainMessenger = await ethers.getContractFactory("OnChainMessenger", deployer);
    const onChainMessenger = await OnChainMessenger.deploy();
    await onChainMessenger.deployed();

    await onChainMessenger.connect(sender).sendMessage(recipientAddr, content);

    message = await onChainMessenger.messages(recipientAddr);
  });

  it("should store a message content", async () => {
    assert.equal(message.content, content);
  });

  it("should store a message sender", async () => {
    assert.equal(message.sender, senderAddr);
  });
});
