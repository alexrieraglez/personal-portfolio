---
title: Portfolio Personal
publishDate: 2026-11-18 00:00:00
img: /assets/work/personal-portfolio.png
img_alt: Diagrama de arquitectura del portfolio despleado en AWS
description: |
  Desarrollo y despliegue de un portfolio profesional bilingüe con Astro y TypeScript, utilizando AWS, Terraform y GitHub Actions para implementar una infraestructura segura y automatizada.
tags:
  - Astro
  - AWS
  - Terraform
  - GitHub Actions
---

## Introducción

Este proyecto consiste en el desarrollo de mi **portfolio profesional**, una aplicación web diseñada para presentar mi experiencia, formación, certificaciones y proyectos relacionados con la ingeniería informática, la ciberseguridad y el cloud computing.

Partiendo de una plantilla de **Astro**, personalicé la interfaz y su identidad visual, incorporando diseño responsive, temas claro y oscuro e internacionalización en español e inglés.

El contenido de los proyectos se gestiona mediante **Astro Content Collections y Markdown**, facilitando su mantenimiento y ampliación sin necesidad de modificar los componentes de la aplicación.

Además del desarrollo web, uno de los objetivos principales fue diseñar y desplegar una infraestructura cloud real, aplicando buenas prácticas de seguridad, automatización y control de costes.

## Arquitectura Cloud

La aplicación utiliza una **arquitectura estática y sin servidores de aplicación**, desplegada íntegramente en Amazon Web Services (AWS).

Los componentes principales son:

- **Amazon S3:** almacenamiento privado de los archivos estáticos generados durante la compilación de Astro.
- **Amazon CloudFront:** distribución del contenido mediante CDN, HTTPS y caché, utilizando Origin Access Control (OAC) para acceder de forma segura a S3.
- **Amazon Route 53:** gestión DNS del dominio personalizado `alejandroriera.dev`.
- **AWS Certificate Manager:** gestión del certificado TLS utilizado por CloudFront.
- **Terraform:** definición y aprovisionamiento de los recursos AWS mediante infraestructura como código.

La infraestructura se organiza en dos configuraciones Terraform independientes: una para crear el almacenamiento del estado remoto y otra para gestionar los recursos de la aplicación.

El estado de Terraform se almacena en un **segundo bucket S3 privado**, con versionado y bloqueo para proteger las operaciones concurrentes.

La arquitectura completa se encuentra **representada en el diagrama superior**, diferenciando el acceso de usuarios, el despliegue automatizado y la gestión de infraestructura.

## Seguridad y automatización

Para reducir la exposición de los recursos y automatizar las actualizaciones, incorporé varios mecanismos de seguridad y CI/CD:

- **Acceso privado a S3:** bloqueo del acceso público y utilización de CloudFront OAC, evitando exponer directamente los archivos del origen.
- **Gestión de identidades:** autenticación de GitHub Actions mediante OpenID Connect (OIDC) y un rol IAM con permisos mínimos, sin almacenar claves AWS permanentes.
- **CI/CD:** validación automática de la compilación de Astro en las Pull Requests y despliegue al integrar cambios en la rama `main`.
- **Protección del repositorio:** reglas de protección de `main`, comprobaciones obligatorias y referencias a GitHub Actions fijadas mediante SHA.
- **Protección y costes:** HTTPS, protecciones básicas de AWS WAF y seguimiento del gasto mediante AWS Budgets.

El pipeline de despliegue compila la aplicación, sincroniza los archivos generados con S3 e invalida la caché de CloudFront para publicar la nueva versión.

## Resultados

El resultado es un **portfolio bilingüe, accesible mediante un dominio propio y desplegado automáticamente en AWS**, sin necesidad de administrar servidores.

La solución combina tecnologías de desarrollo frontend con servicios cloud administrados y una infraestructura reproducible mediante Terraform.

Asimismo, la utilización del plan gratuito de CloudFront y los mecanismos de seguimiento de costes permiten mantener una arquitectura adecuada para un proyecto personal de bajo consumo.

**Este proyecto me ha permitido integrar desarrollo web, infraestructura como código, seguridad cloud y prácticas DevSecOps en un entorno funcional, manteniendo separados los procesos de desarrollo, despliegue y administración de infraestructura.**

## Código fuente y web

El código de Astro, la configuración Terraform y el pipeline de GitHub Actions están disponibles públicamente.

- [Ver código fuente en GitHub](https://github.com/alexrieraglez/personal-portfolio)