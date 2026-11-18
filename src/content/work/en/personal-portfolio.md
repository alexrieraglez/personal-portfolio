---
title: Personal Portfolio
publishDate: 2026-11-18 00:00:00
img: /assets/work/personal-portfolio.png
img_alt: Architecture diagram of the personal portfolio deployed on AWS
description: |
  Development of a bilingual personal portfolio using Astro and TypeScript to showcase projects, professional experience and certifications, with deployment planned on AWS.
tags:
  - Astro
  - AWS
  - Terraform
  - GitHub Actions
---

## Introduction

This project focuses on the development of my **professional portfolio**, a website designed to showcase my experience, education, certifications, and projects related to computer engineering, cybersecurity, and cloud computing.

Starting from an **Astro** template, I customized the interface and visual identity, implementing responsive layouts, light and dark themes, and internationalization in Spanish and English.

Project content is managed using **Astro Content Collections and Markdown**, making it easier to maintain and extend the website without modifying its application components.

Beyond frontend development, one of the main objectives was to design and deploy real cloud infrastructure while applying security, automation, and cost management best practices.

## Cloud Architecture

The application follows a **static, serverless application-hosting architecture**, deployed entirely on Amazon Web Services (AWS).

The main components include:

- **Amazon S3:** private storage for the static assets generated during the Astro build process.
- **Amazon CloudFront:** content delivery through a CDN, HTTPS, and caching, using Origin Access Control (OAC) to securely access S3.
- **Amazon Route 53:** DNS management for the custom domain `alejandroriera.dev`.
- **AWS Certificate Manager:** management of the TLS certificate used by CloudFront.
- **Terraform:** definition and provisioning of AWS resources through Infrastructure as Code.

The infrastructure is organized into two independent Terraform configurations: one for provisioning remote state storage and another for managing the application resources.

Terraform state is stored in a **separate private S3 bucket**, with versioning and state locking to protect concurrent operations.

The complete architecture is **illustrated in the diagram above**, distinguishing user access, automated deployment, and infrastructure management.

## Security and Automation

To minimize resource exposure and automate updates, I implemented several security and CI/CD mechanisms:

- **Private S3 access:** public access restrictions and CloudFront OAC, preventing direct public access to the origin.
- **Identity management:** GitHub Actions authentication through OpenID Connect (OIDC) and a least-privilege IAM role, without storing permanent AWS access keys.
- **CI/CD:** automatic Astro build validation for Pull Requests and deployment when changes are merged into the `main` branch.
- **Repository protection:** branch protection rules, required checks, and GitHub Actions pinned to full commit SHAs.
- **Protection and costs:** HTTPS, AWS WAF core protections, and cost monitoring through AWS Budgets.

The deployment pipeline builds the application, synchronizes generated assets with S3, and invalidates the CloudFront cache to publish updated content.

## Results

The result is a **bilingual professional portfolio, accessible through a custom domain and automatically deployed on AWS**, without the need to manage application servers.

The solution combines frontend technologies with managed cloud services and reproducible infrastructure defined using Terraform.

Additionally, the CloudFront Free plan and cost monitoring mechanisms help maintain an architecture suitable for a low-traffic personal project.

**This project allowed me to combine web development, Infrastructure as Code, cloud security, and DevSecOps practices in a functional environment, while keeping development, deployment, and infrastructure management processes clearly separated.**

## Source Code and Website

The Astro source code, Terraform configuration, and GitHub Actions deployment pipeline are publicly available.

- [View source code on GitHub](https://github.com/alexrieraglez/personal-portfolio)