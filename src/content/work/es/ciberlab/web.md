---
title: CiberLab - Plataforma web
publishDate: 2026-05-31 00:00:00
img: /assets/work/ciberlab/web.png
img_alt: Plataforma web de análisis de malware del proyecto CiberLab
description: |
  Mantenimiento y ampliación de una plataforma web de análisis de malware, adaptando su modelo de datos y visualización para integrar los resultados obtenidos mediante CAPE Sandbox.
tags:
  - React
  - Node.js
  - MariaDB
  - Ciberseguridad
  - Docker
---

## Introducción

**CiberLab** es un proyecto de investigación en ciberseguridad de INCIBE, desarrollado en colaboración con el Grupo de Robótica, que ofrece una plataforma web para el análisis y consulta de muestras de malware.

La aplicación permite a los usuarios enviar archivos potencialmente maliciosos para su análisis. Las muestras son procesadas mediante **CAPE Sandbox**, un entorno de análisis dinámico que recopila información sobre el comportamiento del malware.

Posteriormente, los resultados son procesados para generar informes y almacenar la información relevante, que puede consultarse desde la propia plataforma.

Mi participación se centró en el **mantenimiento y ampliación de la aplicación web existente**, adaptándola a las nuevas necesidades del proyecto y a la información generada por los sistemas de análisis.

## Arquitectura y tecnologías

La plataforma está desarrollada con **React** para el frontend y **Node.js con Express** para la API, utilizando Sequelize como ORM y MariaDB para la persistencia de datos.

La aplicación se integra con otros componentes del ecosistema CiberLab, encargados del análisis de muestras y la generación automatizada de informes.

También se utiliza **Hugging Face** como repositorio de conjuntos de datos y resultados de análisis, mientras que Docker facilita el despliegue de los componentes de la aplicación.

![Arquitectura tecnológica de CiberLab](/assets/work/ciberlab/web-architecture.png)

## Desarrollo e implementación

Mi trabajo consistió principalmente en ampliar las capacidades de almacenamiento y consulta de los resultados obtenidos durante los análisis de malware.

Entre las principales modificaciones realizadas destacan:

- **Ampliación del modelo de datos:** adaptación de la base de datos MariaDB para almacenar información estructurada sobre familias de malware, firmas de detección, indicadores de compromiso (IoC) y otros resultados del análisis.

- **Integración de nuevos resultados:** modificación de la lógica de la aplicación para incorporar la información adicional proporcionada por los sistemas de procesamiento de muestras.

- **Visualización de información:** adaptación de la interfaz para consultar los nuevos datos y representarlos mediante gráficas y estadísticas.

- **Mantenimiento de la plataforma:** actualización de componentes existentes para mantener su compatibilidad con la evolución del proyecto.

Estas modificaciones permitieron ampliar la información disponible para los usuarios y facilitar el análisis de los resultados recopilados por CiberLab.

## Resultados

El resultado fue una plataforma ampliada, capaz de almacenar y presentar información más detallada sobre las muestras analizadas.

La evolución del modelo de datos permite organizar distintos indicadores y características del malware, mientras que las herramientas de visualización facilitan su consulta e interpretación.

![Visualización de estadísticas de malware en CiberLab](/assets/work/ciberlab/web-graphics.png)

Este trabajo me permitió adquirir experiencia en el **mantenimiento y evolución de aplicaciones web existentes**, especialmente en el diseño de modelos de datos, integración entre componentes y desarrollo de herramientas aplicadas a la ciberseguridad.

## Plataforma y recursos

La plataforma CiberLab puede consultarse públicamente. El código fuente de la aplicación web pertenece al proyecto de investigación y se mantiene en un repositorio privado.

- [Acceder a CiberLab](https://seguridad.unileon.es/analizar-muestras/)
- [Repositorio de Hugging Face del Grupo de Robótica de la Universidad de León](https://huggingface.co/unileon-robotics)
