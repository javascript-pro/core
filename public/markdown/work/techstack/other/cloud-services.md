---
order: 20
title: AWS, Firebase, GCP, Azure
description:
slug: /work/techstack/other/cloud-services
icon: techstack
image: /png/3rdParty/wikipedia.png
tags: cloud
---

> You don’t choose a cloud platform. The client has one. You learn each by immersion

### **The concept**

Modern React apps rarely stand alone. They sit on top of:

- hosting
- auth
- storage
- databases
- APIs
- queues
- serverless functions
- CI/CD
- monitoring

Every company solves those with a cloud provider.
So when you join a project, you adopt whatever stack is already in place:

- Company A → **AWS** (Cognito, S3, CloudFront, Lambda, DynamoDB)
- Company B → **Firebase** (Auth, Firestore, Functions, Hosting)
- Company C → **Azure** (App Services, AAD, Functions, CosmosDB)
- Startup → **Supabase**
- Enterprise → **Hybrid mix**

As a frontend engineer, you plug your React code into those services to deliver features. You don’t need the full Cloud Architect skillset — just enough to build, deploy, debug, and integrate reliably.

### **Why you naturally get good at it over time**

#### **1. Same patterns, different names**

Auth, storage, databases, serverless, hosting — every cloud provides these.
Once you understand the pattern, switching cloud is translation work:

- _AWS Cognito → Firebase Auth → Azure AD B2C_
- _S3 → Firebase Storage → Azure Blob Storage_

The metaphors repeat.

#### **2. React forces you into the cloud**

Every login UI, every file upload, every realtime update pushes you to learn how the backend works. You end up understanding IAM, roles, endpoints, throttling, caching, deployment pipelines — simply because the UI needs them.

#### **3. You debug across the boundary**

Frontend bugs often originate in:

- CORS
- permissions
- API routes
- expired tokens
- functions timing out

Solving these teaches you the cloud platform in practice, not theory.

#### **4. Serverless functions make it accessible**

Lambdas, Firebase Functions, Azure Functions — they let frontend developers write backend logic without deep ops knowledge.
It’s a natural progression: write a small function → deploy → observe logs → repeat.

#### **5. Deployments become muscle memory**

Uploading assets, configuring caching, invalidating CDNs, setting environment variables — you do these repeatedly across projects. Familiarity compounds fast.

#### **6. Cloud consoles converge**

All major clouds eventually feel similar:

- dashboards
- logs
- metrics
- function editors
- secret managers
- auth configuration

The UX differs, but the workflow is the same.

#### **7. CI/CD integration gives you control**

React developers frequently integrate with GitHub Actions, Vercel, Netlify, or native cloud pipelines, which reinforces understanding of builds, artifacts, environments, and releases.

#### **8. You absorb DevOps by osmosis**

You’re not hired as DevOps, but working beside them exposes you to:

- environment promotion
- IaC
- security policies
- API gateways
- container workflows
- monitoring tools

This builds confidence over time.

### **The outcome**

After enough projects, you become “cloud multilingual.”
You can drop into AWS, Firebase, or Azure and find your way around quickly because the underlying mental model is the same:

**auth + functions + storage + database + hosting + CI/CD → integrated into React.**

If you want, I can compress this into:

- a CV bullet
- a Goldlabel documentation snippet
- or a page for your tech stack section.
