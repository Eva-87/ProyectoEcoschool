# 🌱 EcoSchool
<p align="center"><img width="128" height="128" alt="logo" src="https://github.com/user-attachments/assets/5c77f5a0-65af-4d0f-a1d1-a20c173d9b78" /></p>

<p align="center">
  <strong>Gestión inteligente de residuos en entornos escolares</strong><br/>
  Promoviendo sostenibilidad, educación ambiental y eficiencia.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql" />
  <img src="https://img.shields.io/badge/License-ISC-lightgrey" />
  <img src="https://img.shields.io/badge/Hackathon-Project-success" />
</p>

---

## ✨ Descripción

**EcoSchool** es una aplicación desarrollada durante un hackathon que permite a centros educativos **registrar, monitorizar y gestionar residuos** de forma eficiente.

Su objetivo es fomentar **hábitos sostenibles**, mejorar la **organización de recogidas** y ofrecer **visualización de datos en tiempo real**.

---

## 🚀 Características principales

* ♻️ Registro sencillo de residuos por tipo y peso
* 📊 Dashboard con métricas y estadísticas visuales
* 🔔 Sistema de alertas para residuos pendientes
* 📌 Gestión de estados del residuo
* 📱 Interfaz totalmente responsiva

---

## 🖼️ Capturas de pantalla

### Estadísticas y alertas
<img width="458" height="373" alt="Captura de pantalla 2026-02-19 174706" src="https://github.com/user-attachments/assets/d393db98-7a9e-47bb-ad5a-c41301f748b3" />


### Registro de residuos

<img width="434" height="370" alt="Captura de pantalla 2026-02-19 174602" src="https://github.com/user-attachments/assets/c41ae012-4251-40fa-aefe-fe0e5a3fb9ad" />



### Home

<img width="445" height="375" alt="Captura de pantalla 2026-02-19 174620" src="https://github.com/user-attachments/assets/c7d3717e-1c63-4ba1-b23a-0e7de1bee48e" />



---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js
* PostgreSQL
* pg (node-postgres)

---

## 📁 Estructura del proyecto

```
ecoSchool/
├── config/
├── ecoSchool-frontend/
├── gestion-residuos-front/
├── docs/
│   ├── logo.png
│   └── screenshots/
├── package.json
└── README.md
```

---

## ⚙️ Instalación

### 1️⃣ Clonar repositorio

```bash
git clone <url-del-repositorio>
cd ecoSchool
```

### 2️⃣ Instalar dependencias

```bash
npm run install:all
```

### 3️⃣ Variables de entorno

Crear `.env` en la raíz:

```
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=ecoscool_db
DB_PASSWORD=tu_contraseña
DB_PORT=5432
```

### 4️⃣ Base de datos

* Instalar PostgreSQL
* Crear `ecoscool_db`
* Ejecutar migraciones si existen

---

## ▶️ Ejecución

### Frontend

```bash
npm run dev
```

Disponible en **http://localhost:5173**

### Backend

```bash
npm run dev:backend
```

### Producción

```bash
npm run build
npm run start
```

---

## 📜 Scripts

| Script                | Descripción                    |
| --------------------- | ------------------------------ |
| `npm run dev`         | Frontend en desarrollo         |
| `npm run dev:backend` | Backend en desarrollo          |
| `npm run install:all` | Instala todas las dependencias |
| `npm run build`       | Build de producción            |
| `npm run start`       | Backend en producción          |

---

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama: `feature/nueva-funcionalidad`
3. Commit y push
4. Abrir Pull Request

---

## 👩‍💻 Autores

Proyecto desarrollado durante un **hackathon** por el equipo **EcoSchool**.

<p>Alberto García</p>
<p>Melissa Gómez</p>
<p>María Eva Martín</p>
<p>Jen Ceballos</p>
<p>Stiwar Troyano</p>
<p>María Regueiro</p>

---

## 📄 Licencia

Licencia **ISC**.

---

## 🌍 Visión

Educar en sostenibilidad desde la escuela es sembrar futuro.
**EcoSchool** busca convertir la gestión de residuos en una experiencia **didáctica, medible y ecológica**.
