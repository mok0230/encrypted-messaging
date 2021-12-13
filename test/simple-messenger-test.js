const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleMessenger", function () {
  it("Should store a message", async function () {
    const deployer = await ethers.provider.getSigner(0);
    const sender = await ethers.provider.getSigner(1);
    const recipient = await ethers.provider.getSigner(2);

    const senderAddr = await sender.getAddress();
    const recipientAddr = await recipient.getAddress();

    const SimpleMessenger = await ethers.getContractFactory("SimpleMessenger", deployer);
    const simpleMessenger = await SimpleMessenger.deploy();
    await simpleMessenger.deployed();

    await simpleMessenger.connect(sender).sendMessage(recipientAddr, "foo");

    const firstMessage = await simpleMessenger.messages(recipientAddr, 0);

    assert.equal(firstMessage.sender, senderAddr);
  });
});
