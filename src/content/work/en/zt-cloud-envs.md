---
title: Zero Trust in Cloud Environments
publishDate: 2026-07-22 00:00:00
img: /assets/work/zt-cloud-envs.png
img_alt: Zero Trust security architecture deployed on AWS
description: |
  Implementation and evaluation of the Zero Trust paradigm in an AWS cloud architecture, applying identity, network, and Kubernetes security controls.
tags:
  - AWS
  - Kubernetes
  - Zero Trust
  - Cybersecurity
  - Terraform
---

## Introduction

This project is my **Master's Thesis in Cybersecurity Research**, completed at the University of León and defended in July 2026.

Its objective was to analyze the technical and economic impact of adopting the **Zero Trust** paradigm in a cloud infrastructure, following the principle of *never trust by default and explicitly verify every access request*.

To achieve this, I designed and deployed a reference application on **AWS**, using a microservices-based architecture with React, FastAPI, PostgreSQL, and Amazon S3, orchestrated with Amazon EKS and managed through Terraform.

Starting from this initial solution, I identified several areas of implicit trust and carried out an incremental migration toward a Zero Trust architecture while preserving the application's functionality.

## Zero Trust Implementation

The migration focused on introducing native AWS and Kubernetes security controls across five key areas:

- **Identity and least privilege:** replaced static S3 access credentials with workload-specific IAM roles using IAM Roles for Service Accounts (IRSA).

- **Network segmentation:** implemented Kubernetes NetworkPolicies to restrict internal communication between components, allowing only the necessary traffic flows.

- **Container hardening:** applied security configurations to Kubernetes pods to reduce privileges and minimize their attack surface.

- **Secure administrative access:** disabled the public Amazon EKS endpoint and enabled a private endpoint, accessed through an EC2 bastion host using AWS Systems Manager Session Manager.

- **Auditing and traceability:** integrated AWS CloudTrail and CloudWatch to record administrative activity and facilitate the review of relevant events.

The resulting architecture reduces implicit trust between components and strengthens the separation of responsibilities without completely replacing the original infrastructure.

The final architecture, **shown in the diagram above**, integrates these mechanisms into the original AWS infrastructure, strengthening workload identity, internal network segmentation, and protection of the Kubernetes control plane.

## Evaluation and Results

To assess the impact of the migration, I compared both architectures through **functional, security, performance, complexity, deployment, and cost evaluations**.

The results confirmed that the Zero Trust solution preserved the application's original functionality while improving its security posture, particularly in identity management, network segmentation, and service exposure.

Regarding performance, no significant degradation was observed in the evaluated operations.

However, adopting the new security controls increased operational complexity and the number of infrastructure resources required:

| Metric | Baseline Architecture | Zero Trust |
|---|---:|---:|
| Terraform resources | 46 | 73 |
| Average deployment time | 666.33 s | 690.62 s |
| Estimated monthly cost | 177.64 USD | 186.69 USD |

The estimated cost increase was **9.05 USD per month (+5.09%)**, while the average deployment time increased by approximately 24 seconds.

**The main conclusion of this project is that adopting Zero Trust controls in an existing cloud architecture is feasible, improving its security without compromising functionality or introducing significant performance degradation.**

The greatest challenge identified was not financial but operational: managing a more complex infrastructure with additional resources, policies, and security mechanisms.

## Source Code and Documentation

The source code, Kubernetes manifests, and Terraform infrastructure definitions are publicly available.

- [View source code on GitHub](https://github.com/alexrieraglez/zt-cloud-tfm)
- [Read the full Master's Thesis](/assets/docs/zt-cloud-envs-tfm.pdf)
