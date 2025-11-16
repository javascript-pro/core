---
order: 130
title: Paywall
description: Access Control Cartridge
slug: /work/goldlabel/cartridges/paywall
icon: paywall
image: /jpg/ai/SWAT-Baby.jpg
tags: cartridge, free, paywall, use cases, acess, auth, subscription
noImage: true
---

> User accounts, passwords, membership access and payment

## Use Cases

We have a page in our writing section for an e-book we are working on. It's not ready to be public yet, so we'll add the attribute `paywall: true` to the content's frontmatter markdown. Now only logged in users can view.

But how easy is it to become a logged in user and see the content? There is a direct relationship between that and how many users will do it.

So we don't ask for email. We don't ask for a password. We need then to be accountable, we need them to be logged in, but we don't need them to create an account with us. We just need them to click the contine with Google or GitHub links and that Authentication will be done by the respective providers

It still creates a user account on our firebase app, and should the user ever log out they can easily log back in by clicking the same button

In this way we can layer up the Paywall to include pages which are viewable if logged in, viewable only if the user has a Stripe subscription or viewable to only certain users.

In other words... Access control

## Examples

[PageGrid thumbnails="yes" pages="/work/cases/hertwig-auer, /balance/writing/not-here-to-fuck-spiders, /balance/writing/not-here-to-fuck-spiders/bez"]
