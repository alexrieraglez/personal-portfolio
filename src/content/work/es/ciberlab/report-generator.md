---
title: CiberLab - Generador de informes
publishDate: 2026-05-31 00:00:00
img: /assets/work/ciberlab/report-generator.png
img_alt: Diagrama de generación automatizada de informes de análisis de malware
description: |
  Desarrollo de una librería Python modular para procesar resultados de análisis dinámico de malware y generar informes PDF mediante modelos de lenguaje, enriquecimiento de datos y automatización.
tags:
  - Python
  - CAPE Sandbox
  - LLM
  - Ciberseguridad
  - Automatización
---

## Introducción

Este proyecto forma parte de **CiberLab**, una iniciativa de investigación en ciberseguridad desarrollada en el entorno de la Universidad de León y el Grupo de Robótica.

Su objetivo fue desarrollar una **librería Python capaz de transformar los resultados técnicos de un análisis dinámico de malware en informes PDF estructurados y comprensibles**, facilitando la interpretación de la información obtenida.

La librería se integra como un módulo de reporting de **CAPE Sandbox**, ejecutándose una vez finalizado el análisis de una muestra. A partir de los resultados generados por CAPE, procesa la información, utiliza modelos de lenguaje (LLM) para elaborar su interpretación y genera un documento con los resultados más relevantes.

Desde el principio, diseñé la solución con un enfoque **modular, configurable y reutilizable**, separando las distintas etapas del procesamiento para facilitar su mantenimiento y permitir futuras integraciones con otras herramientas de análisis de malware y proveedores de modelos de lenguaje.

## Arquitectura y funcionamiento

El sistema sigue un pipeline de procesamiento dividido en varias etapas independientes:

1. **Preprocesamiento:** recibe los resultados JSON de CAPE Sandbox, selecciona la información relevante, normaliza los datos y reduce el volumen de información que debe procesar el modelo de lenguaje.

2. **Enriquecimiento de datos:** integra información adicional de servicios como VirusTotal y procesa elementos relevantes del análisis, incluyendo indicadores de compromiso, firmas de detección y comportamiento de los procesos.

3. **Procesamiento mediante LLM:** utiliza la API de OpenAI para interpretar la información recopilada y generar contenido estructurado, como resúmenes del análisis, características del malware y recomendaciones iniciales.

4. **Postprocesamiento:** valida, limpia y normaliza la respuesta del modelo, corrigiendo posibles inconsistencias y adaptando los datos al formato esperado por el generador de documentos.

5. **Generación del informe:** utiliza **ReportLab** para construir automáticamente un PDF organizado en secciones, tablas y elementos visuales.

La librería también incorpora funcionalidades específicas para procesar imágenes y representar gráficamente los árboles de procesos obtenidos durante el análisis.

Su arquitectura separa claramente el tratamiento de los datos, la interacción con el LLM y la presentación de resultados, evitando que estas responsabilidades dependan directamente unas de otras.

## Desarrollo e implementación

Uno de los principales objetivos durante el desarrollo fue conseguir que la solución pudiera evolucionar sin necesidad de modificar continuamente su lógica interna.

Para ello, implementé diferentes mecanismos:

- **Arquitectura modular:** separación del código en paquetes independientes para preprocesamiento, integración con LLM, postprocesamiento y generación de PDF.

- **Configuración flexible:** utilización de archivos YAML, perfiles de ejecución y variables de entorno para gestionar rutas, parámetros, modelos, límites de procesamiento y credenciales.

- **Tratamiento de datos de malware:** extracción y normalización de información como familias de malware, indicadores de compromiso (IoC), firmas, hashes y procesos ejecutados.

- **Validación de resultados:** utilización de esquemas de datos y reglas configurables de limpieza para mejorar la consistencia de la información producida por el LLM.

- **Enriquecimiento con VirusTotal:** incorporación de información complementaria para contextualizar los resultados obtenidos durante el análisis dinámico.

- **Generación de documentos:** construcción de informes mediante ReportLab, incluyendo resúmenes ejecutivos, información de archivos, indicadores de compromiso, firmas y representaciones visuales.

Este diseño permite adaptar distintas partes del procesamiento y facilita la futura incorporación de otros formatos de análisis o proveedores de modelos de lenguaje, sin tener que rediseñar completamente la librería.

### Calidad del código y documentación

El proyecto se desarrolló como un paquete Python gestionado mediante **Poetry**, acompañado de documentación técnica generada con **Sphinx**.

Además, configuré un workflow de integración continua mediante **GitHub Actions**, que automatiza distintas comprobaciones al realizar cambios en el repositorio:

- Análisis estático con Ruff.
- Comprobación del formato con Black.
- Ejecución de pruebas automatizadas con pytest.
- Compilación y validación de la documentación Sphinx.

Estas herramientas permiten mantener una estructura de desarrollo organizada y facilitan el mantenimiento y la evolución del proyecto.

## Resultados

El resultado fue una librería Python integrable en CAPE Sandbox, capaz de automatizar el proceso de transformación de resultados técnicos de malware en **informes PDF estructurados y legibles**.

Los informes pueden incluir información sobre la muestra analizada, clasificación y familia de malware, firmas detectadas, indicadores de compromiso, comportamiento observado, árboles de procesos y recomendaciones iniciales.

![Portada de ejemplo de informe PDF generado automáticamente](/assets/work/ciberlab/report-generator-portrait.png)

Además de generar el documento final, la librería devuelve información estructurada sobre los resultados procesados, facilitando su integración con otros componentes de CiberLab.

El proyecto me permitió profundizar en el **desarrollo de librerías Python, procesamiento de datos de ciberseguridad, integración de modelos de lenguaje y automatización de pipelines**, prestando especial atención a la modularidad y la mantenibilidad del código.

## Código fuente y documentación

El proyecto es de código abierto y dispone de documentación técnica pública, donde se describen sus módulos, configuración y principales funcionalidades.

- [Ver código fuente en GitHub](https://github.com/uleroboticsgroup/ciberlab-report-generator)
- [Consultar la documentación Sphinx](https://uleroboticsgroup.github.io/ciberlab-report-generator/)
- [Licencia CC BY-NC-SA 4.0](https://github.com/uleroboticsgroup/ciberlab-report-generator/blob/main/LICENSE)
