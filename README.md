# Encrypted Messaging

I've become quite intrigued lately with the prospect of on-chain encrypted messaging leveraging any Ethereum wallet's public/private key for encryption and decryption. Encrypting data with a given user's public key is a relatively easy operation. But in order to decrypt this data seamlessly in a dapp, the Ethereum wallet must play a role. The only alternative way to decrypt is instructing the user to export their private key and run an algorithm, which is a terrible user experience for the mainstream user.

When I first started considering this implementation, I was surprised to learn it was not already standardized, but there have been at least 2 efforts to do so in the past:

1) [Add web3.eth.encrypt and web3.eth.decrypt functions](https://github.com/ethereum/EIPs/pull/1098)
2) [EIP-2844: Add DID related methods to the JSON-RPC](https://github.com/ethereum/EIPs/issues/2845)

In both cases, this simple encrypt/decrypt implementation got conflated with a much larger topic around decentralized identity (DID). The DID discussion opens a tremendous number of difficult technical decisions that ultimately stalled both of the EIPs above. 

We need to decouple the two, but that's a topic for an EIP I'm hoping to author in the near future. For the purposes of this repo, it turns out MetaMask implemented an [eth_decrypt](https://docs.metamask.io/guide/rpc-api.html#eth-decrypt) and [eth_getEncryptionPublicKey](https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods) in their RPC API despite lack of a published standard. While this is potentially problematic for a number of reasons, it allows me to play with this API.

This repo contains a number of sample implementations with this encrypt/decrypt API.

## Hardhat Commands

Sample set of Hardhat commands:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Resources

Sample implementation: https://codesandbox.io/s/metamask-encrpt-decrypt-example-uzssd?file=/src/App.tsx