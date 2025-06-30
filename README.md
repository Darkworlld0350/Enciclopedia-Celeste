from pathlib import Path

# Contenido del README.md como string
readme_content = """# 🌌 Enciclopedia Celeste Interactiva

Una plataforma web educativa que permite explorar objetos celestes (planetas, estrellas, galaxias, etc.) mediante búsquedas y visualizaciones interactivas, obteniendo datos científicos en tiempo real desde APIs astronómicas confiables como **NED**, **SIMBAD** y **le-systeme-solaire.net**.

---

## 🚀 Características principales

- 🔭 Buscador tipo Google para consultar objetos celestes
- 📊 Fichas científicas detalladas usando datos oficiales (en cascada)
- 🪐 Visualización en tarjetas (cards) estilo catálogo
- 🌠 Integración de imágenes desde la API oficial de NASA
- 🔍 Filtros avanzados para explorar por tipo (planeta, estrella, etc.)
- 🌙 UI moderna con modo oscuro y diseño accesible

---

## 📁 Estructura del proyecto
enciclopedia-celeste/
│
├── app.js # Configuración principal de Express
├── public/
│ └── styles/
│ └── style.sass # Estilos SASS personalizados
├── views/
│ └── pages/ # Vistas Pug (Catálogo, Detalles, NASA, Científicos)
│ └── layouts/
│ └── layout.pug # Layout base
├── controllers/ # Lógica de rutas y controladores
├── routes/ # Archivos de rutas Express
├── services/ # Integración con APIs externas (NED, SIMBAD, NASA, Solar)
└── package.json

yaml
Mostrar siempre los detalles

Copiar

---

## ⚙️ Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/usuario/enciclopedia-celeste.git
cd enciclopedia-celeste
Instalar dependencias

bash
Mostrar siempre los detalles

Copiar
npm install
Compilar Sass (una vez)

bash
Mostrar siempre los detalles

Copiar
sass public/styles/style.sass public/styles/style.css
También puedes dejarlo en modo automático:

bash
Mostrar siempre los detalles

Copiar
npm run sass:watch
Iniciar el servidor

bash
Mostrar siempre los detalles

Copiar
npm start
Abrir en el navegador

arduino
Mostrar siempre los detalles

Copiar
http://localhost:3000
📦 Dependencias utilizadas
Paquete	Uso
express	Servidor web para manejar rutas y vistas
pug	Motor de plantillas para generar HTML dinámico
axios	Cliente HTTP para consumir APIs externas (NED, SIMBAD, NASA, etc.)
xml2js	Conversión de respuestas XML (NED, SIMBAD) a JSON
sass	Preprocesador CSS con estructura modular y mantenimiento limpio
cookie-parser	Manejo de cookies para futuras personalizaciones (modo oscuro, etc.)

🌐 APIs integradas
Fuente	Propósito
[NED (NASA/IPAC)]	Datos científicos extragalácticos
[SIMBAD (CDS)]	Datos estelares
[le-systeme-solaire.net]	Información general del sistema solar
[images-api.nasa.gov]	Imágenes de alta resolución de objetos astronómicos
