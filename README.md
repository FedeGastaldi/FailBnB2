# Trabajo Integrador - DevOps

<img src="public/logo.png" alt="Logo del Proyecto" width="200"/>



## 👨‍💻 Autores

- **Federico Gastaldi**
- **Enzo Dellape**



## 🧰 Tecnologías Utilizadas

- **React** + **Vite.js**
- **Tailwind CSS**
- **Node.js** + **Express.js**
- **MySQL**
- **Docker** + **Docker Compose**
- **Vitest**



## Descripción

Este repositorio contiene el proyecto final correspondiente a la materia **Seminario de DevOps**, desarrollado con un enfoque full stack utilizando React y Vite.js para el frontend, para estilizar utilizamos Tailwind.css. Node.js junto con Express.js para el backend y MySQL como sistema de gestión de bases de datos.

FailBnB es un sistema de gestión hotelera, desarrollado como una aplicación web.Está pensado principalmente para propietarios de inmuebles que quieren publicar sus propiedades para alquilar de forma directa, sin depender de grandes plataformas como Airbnb o Booking.Queremos que puedan gestionar todo desde un solo lugar, con mayor control y sin intermediarios.


## 🔀 Control de versiones

Este proyecto utiliza Git como sistema de control de versiones, y GitHub como plataforma de alojamiento remoto del repositorio.

## 🔀 Estructura de ramas:
- `main`: contiene el código en producción (estable).
- `develop`: rama de desarrollo principal donde se integran nuevas funcionalidades.
- `develop-enzo`: desarrollo individual de Enzo.
- `develop-fede`: desarrollo individual de Fede.
- `feature/*`: ramas específicas para nuevas funcionalidades o mejoras (ej: `feature/editar-perfil`, `feature/login`).

Toda nueva funcionalidad se desarrolla en una rama feature/*, se testea, y luego se realiza un pull request hacia dev. Cuando el código está listo para producción, se mergea dev en main.



## 🐳 Dockerización
El proyecto está completamente dockerizado para facilitar la ejecución y despliegue.

📦 Dockerfiles
frontend/Dockerfile: construye y sirve la aplicación React con Vite y Nginx.

backend/Dockerfile: configura el entorno Node.js/Express y ejecuta la API.

⚙️ docker-compose
Se incluye un archivo docker-compose.yml en la raíz del proyecto que:

Levanta la aplicación frontend y backend en contenedores separados.

Incluye un servicio de base de datos MySQL con persistencia opcional.

Permite correr todo el sistema con un solo comando:

comando:
docker-compose up --build


## ✅ Automatización de tests
Se incluyen pruebas automatizadas para asegurar la calidad del código y prevenir regresiones.

🧪 Herramientas utilizadas
Vitest: para testear componentes y funciones en el frontend.

- instalar vitest:
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

- instalar @vitejs/plugin-react-swc
npm install -D @vitejs/plugin-react-swc

para correr las pruebas: npx vitest run


## 🔁 Diagrama del pipeline DevOps


## 👥 Roles del equipo y conclusiones

👤 Federico Gastaldi
- Desarrollo frontend: estructura del proyecto, diseño de interfaz, autenticación.

- Desarrollo backend: rutas REST, conexión a base de datos, controladores.

- DevOps: dockerización, GitHub Actions, despliegue automático.

👤 Enzo Dellape
- Desarrollo backend: lógica del servidor, validaciones, manejo de errores.

- Gestión de base de datos: modelo relacional, scripts SQL, integración con backend.

- Testing: pruebas automatizadas y verificación de endpoints.


## ✅ Conclusiones
Docker y Docker Compose permitieron simplificar la ejecución del entorno completo con un solo comando.

GitHub Actions automatizó eficazmente el flujo de integración y despliegue.

Se logró separar claramente las capas frontend/backend, facilitando su mantenimiento y prueba individual.

La experiencia reforzó el trabajo en entornos productivos, preparando para escenarios reales de desarrollo y colaboración.