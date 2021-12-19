const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("OnChainMessengerV2", function () {
  let deployerAddr, senderAddr, content, message, onChainMessenger;

  before(async () => {
    const deployer = await ethers.provider.getSigner(0);
    const sender = await ethers.provider.getSigner(1);
    const recipient = await ethers.provider.getSigner(2);

    senderAddr = await sender.getAddress();
    deployerAddr = await deployer.getAddress();
    recipientAddr = await recipient.getAddress();
    content = "foo";

    const OnChainMessenger = await ethers.getContractFactory("OnChainMessengerV2", deployer);
    onChainMessenger = await OnChainMessenger.deploy();
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

  it("should set the deployer as the owner", async() => {
    const owner = await onChainMessenger.owner();
    assert.equal(owner, deployerAddr);
  })
});
