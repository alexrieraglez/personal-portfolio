# Personal Portfolio

Personal portfolio developed with **Astro and TypeScript**, showcasing my professional experience, academic background, technical skills, certifications, and cybersecurity projects.

The website is available in **Spanish and English** and is built as a fully static application, with a focus on performance, accessibility, responsive design, and maintainability.

**Live website:** [alejandroriera.dev](https://alejandroriera.dev)

## Tech Stack

- **Framework:** Astro
- **Language:** TypeScript
- **Content:** Markdown and Astro Content Collections
- **Styling:** CSS
- **Internationalization:** Astro i18n routing
- **Cloud Infrastructure:** AWS S3, CloudFront, Route 53, ACM, IAM, WAF
- **Infrastructure as Code:** Terraform
- **CI/CD:** GitHub Actions with AWS OIDC
- **Version Control:** Git & GitHub

## Features

- Responsive design with desktop and mobile navigation.
- Spanish and English localization.
- Language switching while preserving the current page.
- Dark and light theme support.
- Client-side navigation using Astro ClientRouter, with standard link navigation as a fallback.
- Professional experience and academic background.
- Technical skills and certifications.
- Project showcase with dedicated Markdown pages.
- Downloadable CV in Spanish and English.
- Links to GitHub, LinkedIn, Credly, and email.
- Static hosting with HTTPS and a custom domain.
- Automated deployment to AWS.

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline
├── infra/
│   ├── bootstrap/               # Terraform remote state infrastructure
│   └── website/
│       ├── functions/
│       │   └── rewrite-uri.js   # Astro routing and canonical redirect
│       ├── acm.tf               # TLS certificate and DNS validation
│       ├── backend.tf           # Remote Terraform state
│       ├── cloudfront.tf        # CDN, OAC and edge function
│       ├── iam.tf               # IAM roles and policies
│       ├── locals.tf            # Resource naming
│       ├── oidc.tf              # GitHub OIDC provider
│       ├── outputs.tf           # Infrastructure outputs
│       ├── providers.tf         # AWS providers
│       ├── route53.tf           # DNS configuration
│       ├── s3.tf                # Private website bucket
│       └── versions.tf          # Terraform and provider versions
├── public/
│   ├── assets/
│   │   ├── backgrounds/         # Theme backgrounds
│   │   ├── docs/                # Project documents
│   │   ├── flags/               # Language selector icons
│   │   └── work/                # Project images
│   ├── cv/                      # Spanish and English PDF resumes
│   └── favicon.svg
├── src/
│   ├── components/              # Shared UI components
│   ├── content/                 # Markdown project collection
│   ├── content.config.ts        # Collection loader and schema
│   ├── i18n/                    # Internationalization
│   ├── layouts/                 # Shared page layouts
│   ├── lib/                     # Shared utilities
│   ├── pages/                   # Localized routes
│   │   ├── index.astro          # /
│   │   ├── about.astro          # /about/
│   │   ├── work.astro           # /work/
│   │   ├── work/
│   │   │   └── [...slug].astro  # /work/<slug>/
│   │   ├── en/                  # English routes
│   │   └── 404.astro            # Not-found page
│   ├── styles/                  # Global styles and design tokens
│   └── views/                   # Views shared by both languages
├── tests/                       # Automated tests
├── astro.config.mjs             # Astro and i18n configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and npm scripts
└── package-lock.json            # Locked dependency versions
```

## Internationalization

The website supports two languages:

| Page | Spanish | English |
|---|---|---|
| Home | `/` | `/en/` |
| About | `/about/` | `/en/about/` |
| Projects | `/work/` | `/en/work/` |
| Project details | `/work/<slug>/` | `/en/work/<slug>/` |

Spanish is the default language.

Translations are maintained in:

- `src/i18n/es.ts`
- `src/i18n/en.ts`

Both languages share the same components, layouts, and views.

The language switcher preserves the current page, including nested project routes. The language is determined by the URL, without requiring cookies or browser-language detection.

## Projects

Project content is managed using Astro Content Collections and Markdown.

Spanish and English versions are stored in:

```text
src/content/work/es/
src/content/work/en/
```

Each project includes metadata such as its title, description, publication date, tags, and cover image.

The portfolio showcases:

- **Zero Trust Cloud Environments:** Implementation of Zero Trust security principles in an AWS-based cloud architecture.
- **CiberLab — Web Platform:** Development and enhancement of a malware analysis platform.
- **CiberLab — Report Generator:** Automated malware analysis reporting using Python, CAPE Sandbox, and large language models.

## Getting Started

### Requirements

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/alexrieraglez/personal-portfolio.git
cd personal-portfolio
npm ci
```

### Development

Start the local development server:

```bash
npm run dev
```

The website will be available at `http://localhost:4321/`.

### Production Build

Generate the static website:

```bash
npm run build
```

The production-ready files will be generated in `dist/`.

To preview the production build locally:

```bash
npm run preview
```

### Testing

Run the internationalization and build checks:

```bash
npm run test:i18n
```

These tests verify the generated pages, localized routes, navigation, language attributes, and internal links.

## AWS Architecture

The portfolio is hosted entirely on AWS using a serverless, static architecture.

The main components are:

| AWS Service | Purpose |
|---|---|
| Amazon S3 | Private storage for generated static assets |
| Amazon CloudFront | Global content delivery, caching and HTTPS |
| CloudFront Functions | Astro route rewriting and `www` redirection |
| Origin Access Control | Restricted access from CloudFront to S3 |
| Amazon Route 53 | DNS management for `alejandroriera.dev` |
| AWS Certificate Manager | TLS certificate for the custom domain |
| AWS WAF | Web application security protections |
| AWS IAM | Least-privilege deployment permissions and OIDC authentication |

The website is generated at build time by Astro and does not require a backend server or server-side rendering.

The S3 bucket is private and accessed through CloudFront using Origin Access Control.

The CloudFront Function handles directory-style routes generated by Astro and redirects `www.alejandroriera.dev` to the canonical domain.

### Domain and HTTPS

The website is available at:

**https://alejandroriera.dev**

The custom domain is registered and managed through Amazon Route 53.

DNS records point to the CloudFront distribution using Alias A and AAAA records.

A public TLS certificate issued by AWS Certificate Manager covers both `alejandroriera.dev` and `www.alejandroriera.dev`.

The certificate is managed in `us-east-1`, as required by CloudFront, while the website S3 bucket is hosted in `eu-south-2` (Spain).

Requests to the `www` subdomain are redirected permanently to the canonical domain.

## Infrastructure as Code

The AWS infrastructure is provisioned and maintained using **Terraform**.

Infrastructure configurations are organized into two directories.

### Bootstrap

`infra/bootstrap/` provisions an S3 bucket dedicated to Terraform state storage.

Its configuration includes:

- Server-side encryption with SSE-S3.
- Bucket versioning.
- S3 Block Public Access.
- Protection against accidental deletion.

The bootstrap configuration maintains its own Terraform state separately.

### Website

`infra/website/` manages the website infrastructure, including S3, CloudFront, DNS records, ACM certificates, IAM policies and GitHub OIDC integration.

The Terraform state is stored remotely in the dedicated bootstrap S3 bucket using native S3 state locking.

To initialize and inspect the infrastructure:

```bash
cd infra/website
terraform init
terraform validate
terraform plan
```

Infrastructure changes are applied using:

```bash
terraform apply
```

Changes should always be reviewed before applying them.

The AWS provider is restricted to the intended AWS account to prevent accidental deployments to another account.

### CloudFront Free Plan

The CloudFront distribution uses the **Free plan ($0/month)**, which includes CDN delivery, core WAF protections and eligible Route 53 DNS usage.

The Route 53 hosted zone is associated with this plan.

The CloudFront Free subscription and its AWS-managed WAF association were configured through the AWS Console. Terraform preserves the externally managed WAF association.

The annual domain registration and other AWS services not covered by the plan may incur separate charges.

## CI/CD

Continuous integration and deployment are automated using **GitHub Actions**.

The workflow is defined in:

```text
.github/workflows/deploy.yml
```

### Pull Request Validation

Pull requests targeting `main` trigger the **Build Astro** job:

1. Check out the repository.
2. Configure Node.js.
3. Install dependencies using `npm ci`.
4. Build the website using `npm run build`.

The build job is a required status check for merging into `main`.

### Automatic Deployment

Every push to `main` triggers the deployment pipeline:

1. Build the Astro website.
2. Authenticate to AWS through GitHub OIDC.
3. Synchronize the generated `dist/` directory with the S3 website bucket.
4. Invalidate the CloudFront cache.

This automatically publishes changes after they are merged into the main branch.

### Authentication

GitHub Actions authenticates to AWS using **OpenID Connect (OIDC)** and AWS STS.

The deployment IAM role grants access only to the operations required for publishing the website:

- List the website S3 bucket.
- Read, upload and delete website objects.
- Create CloudFront invalidations.

The role's trust policy restricts access to the designated GitHub repository and the `main` branch.

No permanent AWS access keys are stored in GitHub.

## Security

The project incorporates security practices across the infrastructure and development workflow:

- Private S3 buckets with public access blocked.
- Server-side encryption for S3 storage.
- CloudFront Origin Access Control.
- HTTPS using an ACM-managed certificate.
- AWS WAF core protections.
- GitHub OIDC authentication with temporary credentials.
- Least-privilege IAM deployment role.
- Restricted IAM trust conditions.
- Terraform remote state with native locking.
- AWS account restrictions in the Terraform provider.
- Protected `main` branch with mandatory Pull Requests.
- Required build validation before merging.
- GitHub Actions pinned to full commit SHAs.
- GitHub dependency and secret scanning protections.

## Development Workflow

Development takes place in dedicated feature branches.

Changes are submitted through Pull Requests targeting `main`.

Before merging, GitHub Actions validates that the Astro website builds successfully. Once merged, the deployment pipeline automatically publishes the new version to AWS.

Infrastructure changes are managed independently through Terraform and reviewed before applying them.

## Credits

This portfolio was initially developed using the official [Astro Portfolio Starter](https://github.com/withastro/astro/tree/latest/examples/portfolio), subsequently adapted and extended with custom content, components, localization, and functionality.

Built with [Astro](https://astro.build/).

## Author

**Alejandro Riera González**

Computer Engineer | Cybersecurity & Cloud Computing

- [Website](https://alejandroriera.dev)
- [GitHub](https://github.com/alexrieraglez)
- [LinkedIn](https://www.linkedin.com/in/alejandro-riera-gonzalez/)