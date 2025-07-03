---
order: 10
title: Blockchain
description: What is our experience of Web3?
slug: /work/techstack//blockchain
icon: blockchain
image: /jpg/bitcoin.jpg
tags: techstack, blockchain, web3, casino, igaming, experience
---

> Role: Senior engineer with deep involvement in the frontend and wallet integration

Working for an iGaming company in Malta, I worked on a Bitcoin-native casino platform. The idea was to create a fully crypto-based gambling experience—no fiat rails, no KYC, no intermediaries. It was designed for people who already had Bitcoin and wanted to play anonymously. The CTO led the project, but I was responsible for building and integrating large parts of the frontend and wallet interaction layer.

We weren’t using smart contracts—this was pure Bitcoin, so we had to handle all the UTXO management, confirmations, and transaction broadcasts ourselves. We used a custom backend that talked to a Bitcoin full node via JSON-RPC, and a React frontend that showed real-time balance updates, bets, and outcomes. I also worked on the provably fair game mechanics—mostly commit-reveal using hashed server seeds and client inputs.

From a technical perspective, it was an interesting mix: building a modern web app on a very rigid blockchain. There were a lot of edge cases around fee volatility, unconfirmed transactions, and keeping the user experience smooth while everything settled on-chain.

- No smart contracts: “Bitcoin doesn’t have an EVM—we had to roll everything ourselves”
- Provable fairness: commit-reveal using hash(secret + nonce)
- Stack: React, TypeScript, RPC connection to bitcoind, WebSocket updates, possibly Lightning

Challenges:

- Confirmations and latency
- UX during pending transactions
- Seed/nonce verification for fairness
- Fee estimation and batching

Security:

- Non-custodial for users, with a warm wallet managed server-side
- Basic rate-limiting and abuse prevention at the wallet level

What made it Web3?

It wasn’t Web3 in the Ethereum sense—there were no smart contracts or tokens—but it followed the same values: no intermediaries, crypto-native, provable fairness, and full transparency.

Would you do it differently today?

I’d look at using a Layer 2 like Lightning or even switch to an EVM-compatible chain to move more logic on-chain. But for the use case—low-stakes, high-frequency play—Bitcoin was still the most familiar currency for the audience.

Let me know if you want a quick cheat sheet or a couple of natural conversation responses to practice.