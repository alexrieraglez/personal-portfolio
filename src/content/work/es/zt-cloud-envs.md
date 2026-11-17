---
title: Zero Trust en entornos Cloud
publishDate: 2026-07-22 00:00:00
img: /assets/work/zt-cloud-envs.png
img_alt: Arquitectura de seguridad Zero Trust desplegada en AWS
description: |
  Implementación y evaluación del paradigma Zero Trust en una arquitectura cloud sobre AWS, aplicando controles de identidad, red y seguridad en Kubernetes.
tags:
  - AWS
  - Kubernetes
  - Zero Trust
  - Ciberseguridad
  - Terraform
---


## Introducción

Este proyecto corresponde a mi **Trabajo Fin de Máster en Investigación en Ciberseguridad**, desarrollado en la Universidad de León y defendido en julio de 2026.

Su objetivo fue analizar el impacto técnico y económico de aplicar el paradigma **Zero Trust** a una infraestructura cloud, siguiendo el principio de *nunca confiar por defecto y verificar explícitamente cada acceso*.

Para ello, diseñé y desplegué una aplicación de referencia en **AWS**, utilizando una arquitectura basada en microservicios con React, FastAPI, PostgreSQL y Amazon S3, orquestada mediante Amazon EKS y gestionada con Terraform.

A partir de esta solución inicial, identifiqué diferentes puntos de confianza implícita y realicé una migración incremental hacia una arquitectura Zero Trust, manteniendo la funcionalidad de la aplicación.

## Implementación de Zero Trust

La migración se centró en incorporar controles de seguridad nativos de AWS y Kubernetes, actuando sobre cinco áreas principales:

- **Identidad y mínimo privilegio:** sustitución de credenciales estáticas de acceso a S3 por roles IAM específicos para cada workload mediante IAM Roles for Service Accounts (IRSA).

- **Segmentación de red:** implementación de Kubernetes NetworkPolicies para restringir las comunicaciones internas entre componentes y permitir únicamente los flujos necesarios.

- **Endurecimiento de contenedores:** aplicación de configuraciones de seguridad en los pods para reducir privilegios y limitar su superficie de ataque.

- **Acceso administrativo seguro:** desactivación del endpoint público de Amazon EKS y utilización de un endpoint privado, accesible mediante un bastión EC2 y AWS Systems Manager Session Manager.

- **Auditoría y trazabilidad:** incorporación de AWS CloudTrail y CloudWatch para registrar actividad administrativa y facilitar la revisión de eventos relevantes.

La arquitectura resultante reduce la confianza implícita entre los componentes y refuerza la separación de responsabilidades, sin sustituir completamente la infraestructura original.

La arquitectura final, **representada en el diagrama superior**, integra estos mecanismos sobre la infraestructura original de AWS, reforzando la identidad de los servicios, la segmentación interna y la protección del plano de administración de Kubernetes.

## Evaluación y resultados

Para evaluar el impacto de la migración, comparé ambas arquitecturas mediante pruebas **funcionales, de seguridad, rendimiento, complejidad, despliegue y coste**.

Los resultados confirmaron que la solución Zero Trust mantenía las funcionalidades originales y mejoraba la postura de seguridad, especialmente en la gestión de identidades, segmentación de red y exposición de los servicios.

En cuanto al rendimiento, no se observaron penalizaciones relevantes en las operaciones evaluadas.

La adopción de los nuevos controles sí incrementó la complejidad operativa y el número de recursos necesarios:

| Indicador | Arquitectura base | Zero Trust |
|---|---:|---:|
| Recursos Terraform | 46 | 73 |
| Tiempo medio de despliegue | 666,33 s | 690,62 s |
| Coste mensual estimado | 177,64 USD | 186,69 USD |

El incremento económico estimado fue de **9,05 USD mensuales (+5,09 %)**, mientras que el tiempo medio de despliegue aumentó aproximadamente 24 segundos.

**La principal conclusión del proyecto es que resulta viable incorporar controles Zero Trust en una arquitectura cloud existente, mejorando su seguridad sin comprometer su funcionalidad ni introducir una degradación relevante del rendimiento.**

El mayor desafío identificado no fue económico, sino operativo: gestionar una infraestructura con más recursos, políticas y mecanismos de seguridad.

## Código fuente y documentación

El código fuente, los manifiestos de Kubernetes y la infraestructura definida mediante Terraform están disponibles públicamente.

- [Ver código fuente en GitHub](https://github.com/alexrieraglez/zt-cloud-tfm)
- [Consultar el Trabajo Fin de Máster completo](/assets/docs/zt-cloud-envs-tfm.pdf)
