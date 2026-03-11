# CDAutoAlert

**CDAutoAlert** es una solución profesional y sencilla para Centros de Diagnóstico Automotor (CDA). Permite gestionar clientes, vehículos y realizar un seguimiento riguroso de los vencimientos de documentos críticos como la Revisión Técnico-Mecánica (RTM) y el SOAT.

Este proyecto ha sido desarrollado con un enfoque en código limpio, arquitectura organizada y una interfaz de usuario moderna y minimalista.

## Tecnologías

### Frontend
- **React 19** con **TypeScript**
- **Vite** (Build tool ultra rápido)
- **Axios** (Peticiones HTTP)
- **CSS Custom Properties** (Diseño moderno sin librerías pesadas)

### Backend
- **Node.js** & **Express**
- **Prisma ORM** (Gestión de base de datos tipo-segura)
- **PostgreSQL** (Base de datos relacional)
- **JWT** (Autenticación segura)
- **Bcrypt** (Encriptación de contraseñas)

## Funcionalidades

- **Autenticación**: Registro e inicio de sesión seguro con JWT.
- **Gestión de Clientes**: CRUD completo para administrar información de contacto.
- **Gestión de Vehículos**: Control de vehículos asociados a cada cliente.
- **Alertas de Vencimiento**: Visualización clara de fechas de vencimiento de RTM y SOAT.
- **Interfaz Responsiva**: Diseño adaptativo para diferentes tamaños de pantalla.

## 🛠️ Instalación Local

### Requisitos previos
- Node.js (v18+)
- PostgreSQL

### 1. Clonar el repositorio
```bash
git clone https://github.com/TUUSUARIO/cda-vehicle-management.git
cd cda-vehicle-management
```

### 2. Configuración del Backend
```bash
cd backend
npm install
```
Crea un archivo `.env` en la carpeta `backend/` con:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/cda_db"
JWT_SECRET="tu_secreto_super_seguro"
PORT=3000
```
Sincroniza la base de datos:
```bash
npx prisma migrate dev --name init
```
Inicia el servidor:
```bash
npm run dev
```

### 3. Configuración del Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## Licencia
Este proyecto es para fines educativos y de portafolio.
