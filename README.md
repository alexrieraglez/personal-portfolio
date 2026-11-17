# Personal Portfolio

Personal portfolio developed with **Astro and TypeScript**, showcasing my professional experience, academic background, technical skills, certifications, and cybersecurity projects.

The website is available in **Spanish and English** and is built as a fully static application, with a focus on performance, accessibility, responsive design, and maintainability.

## Tech Stack

- **Framework:** Astro
- **Language:** TypeScript
- **Content:** Markdown and Astro Content Collections
- **Styling:** CSS
- **Internationalization:** Astro i18n routing
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

## Project Structure

```text
├── public/
│   ├── assets/
│   │   ├── backgrounds/          # Theme backgrounds
│   │   ├── docs/                 # Project documents
│   │   ├── flags/                # Language selector icons
│   │   └── work/                 # Project images
│   ├── cv/                       # Spanish and English PDF resumes
│   └── favicon.svg
├── src/
│   ├── components/               # Shared UI
│   ├── content/                  # Markdown project collection
│   ├── content.config.ts         # Collection loader and schema
│   ├── i18n/                     # Internationalization
│   ├── layouts/                  # Shared page layouts
│   ├── lib/                      # Shared utilities
│   ├── pages/                    # Spanish routes at the root
│   │   ├── index.astro           # /
│   │   ├── about.astro           # /about/
│   │   ├── work.astro            # /work/
│   │   ├── work/                 # Global styles and design tokens
│   │   │   └── [...slug].astro   # /work/<slug>/ (supports nested slugs)
│   │   ├── en/                   # English routes
│   │   └── 404.astro             # Global not-found route
│   ├── styles/
│   └── views/                    # Page views shared by both languages
├── tests/                        # Automated test
├── astro.config.mjs              # Astro, Markdown and i18n configuration
├── tsconfig.json                 # Strict TypeScript configuration
├── package.json                  # Dependencies and npm scripts
└── package-lock.json             # Locked dependency versions
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

The current portfolio showcases:

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
git clone https://github.com/alexrieraglez/personal-porfolio.git
cd personal-porfolio
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

## Deployment

The website is designed for static hosting and does not require a backend or server-side rendering.

The planned AWS deployment architecture includes:

- **Amazon S3:** Storage for static website assets.
- **Amazon CloudFront:** Content delivery and HTTPS.
- **AWS Certificate Manager:** TLS certificate management.
- **Amazon Route 53:** DNS management, depending on the domain configuration.
- **Terraform:** Infrastructure as Code.
- **GitHub Actions:** Automated build, validation, and deployment.

Deployment infrastructure and CI/CD automation will be implemented in a subsequent development phase.

## Credits

This portfolio was initially developed using the official [Astro Portfolio Starter](https://github.com/withastro/astro/tree/latest/examples/portfolio), subsequently adapted and extended with custom content, components, localization, and functionality.

Built with [Astro](https://astro.build/).

## Author

**Alejandro Riera González**

Computer Engineer | Cybersecurity & Cloud Computing

- [GitHub](https://github.com/alexrieraglez)
- [LinkedIn](https://www.linkedin.com/in/alejandro-riera-gonzalez/)