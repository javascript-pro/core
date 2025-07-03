---
order: 150
title: Blockchain Crypto Casino
description: Building a Bitcoin-Powered Gambling Platform
slug: /work/techstack/blockchain
icon: bitcoin
image: /png/3rdParty/bitcoin.png
git: https://github.com/javascript-pro/bitcoin-hash
tags: techstack, crypto, blockchain, web3, casino, igaming, experience, bitcoin, malta
---
# Blockchain Crypto Casino

> In 2018, I joined a small iGaming startup in Malta focused on developing a fully anonymous, provably fair crypto casino. The company was founded by veterans of the online gambling world but was pivoting into blockchain as a way to skirt regulatory overhead and payment processor restrictions.

The idea was to create a casino that ran entirely on Bitcoin. Players didn’t need to sign up with an email, provide any personal information, or go through a bank. They could simply send Bitcoin to the site, play games, and withdraw any winnings — all in a matter of minutes.

### Key features

- WebSocket-driven live play (e.g., roulette, dice)
- Bitcoin deposits & withdrawals via ElectrumX
- In-browser entropy generation for provable fairness
- Session-based wallets with automatic hot-wallet sweeping

### My Role

While I wasn’t the lead, I worked closely with the CTO to build out the frontend and middleware layers. This included integrating live WebSocket games, connecting to Electrum servers for blockchain transaction monitoring, and helping define the client API contract.

I also helped with:

- Creating a responsive React UI for multiple games
- Implementing realtime transaction feedback via WebSockets
- Writing middleware to validate Bitcoin deposit addresses
- Working on wallet entropy sources for provable fairness

### Technical Challenges

- **Latency**: Keeping gameplay snappy while querying Bitcoin balances over Electrum
- **Security**: Preventing double spends and replay attacks
- **UX**: Explaining trustless randomness to non-technical users
- **Architecture**: Designing microservices to isolate financial logic

### Outcome

The platform launched in private beta and attracted a small but active cohort of users — mostly from forums and crypto communities. Due to legal ambiguity and lack of licensing, the company eventually wound down operations voluntarily.

Still, it served as a successful proof-of-concept for anonymous, crypto-native gaming.

### Reflections

This project taught me how to move fast in an unregulated space — balancing engineering idealism with pragmatic risk. It also gave me early exposure to the realities of building with Bitcoin: slow confirmation times, Electrum quirks, and the limitations of designing around unfinalized transactions.

It’s also a great reminder of what you _can_ build when traditional financial rails are removed from the equation.

### Technical Assessment

Before joining the team, I completed a technical assessment to demonstrate my understanding of Bitcoin fundamentals and general coding ability. The task involved working directly with Bitcoin hashing algorithms — a core concept behind how transactions are verified on the blockchain. 

The code is here on [GitHub](https://github.com/javascript-pro/bitcoin-hash). While it’s a simple project, it reflects the kind of low-level thinking and hands-on problem solving that this space often demands.