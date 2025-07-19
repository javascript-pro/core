---
order: 130
title: About C.V.
description: How it works
slug: /work/cv/about
icon: openai
image: /png/og.png
tags: CV, jobs, work, resume, AI, OpenAI
github: https://github.com/javascript-pro/core/blob/main/gl-core/cartridges/CV/actions/createPrompt.tsx
---

## Applying for jobs can be time consuming

Each role requires tailoring a cover letter or rewording a CV to match a job description. As developers, we know the real problem isn’t effort — it’s clarity. Am I a good fit? Is this worth my time?

Goldlabel Apps set out to solve this by creating a tool that does one thing well:
Given a CV and a job description, tell me whether the match is good — and why.

### Agile Story

> As a job seeker or recruiter, I want to quickly assess how well a CV matches a job description, so that I can focus my time on roles or candidates that are a good fit.

### Implementation

We built a lightweight AI-powered web app using Next.js and OpenAI's GPT-4 API. Users paste in their CV (in Markdown) and the job description. The app generates a structured fit analysis in natural language.

- A toggle allows switching between first-person and third-person voice.
- A streaming UI provides instant feedback as the model thinks.
- Recruiters or job seekers can copy the result as plain text for outreach.

We also added a simple retry mechanism and logic to detect when a user accidentally pastes code instead of a job description.

### Outcome

The tool reduces friction in job applications. Recruiters can check fit without reading the entire CV. Candidates save time and gain clarity when choosing roles to pursue. As a real tool and example project, it demonstrates our ability to ship.

### Reflection

This feature started as a demo and turned into something genuinely useful. It’s now part of our app, not just as a portfolio piece — but as a working tool we use ourselves.

### Cover letter

Hi,

I’m a senior JavaScript developer with deep experience in React and Next.js, currently exploring new opportunities. To streamline my search, I built a tool that compares my CV with job descriptions and highlights relevant matches — it helps recruiters (and me) see the fit faster. I’ve pasted the result below for your convenience.

You’re also welcome to try the tool yourself:
https://goldlabel.pro/cv

Best regards,
Chris Dorward

📞 07745 763 122
🔗 https://goldlabel.pro
🔗 LinkedIn https://www.linkedin.com/in/chris-dorward
🔗 GitHub https://github.com/javascript-pro

---
