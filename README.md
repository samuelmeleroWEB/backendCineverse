# 🎬 CineVerse – Backend

Backend de **CineVerse**, una API REST desarrollada para dar soporte a una plataforma web de cine con reservas de entradas, compra de menús de comida y panel de administración.

Este repositorio contiene **únicamente el backend** de la aplicación.

---

## 🧩 Descripción general

La API de CineVerse se encarga de:

- Autenticación y autorización de usuarios mediante JWT.
- Gestión de películas, salas y sesiones.
- Creación y gestión de reservas (entradas y menús).
- Gestión de usuarios.
- Gestión de películas destacadas (MVP).
- Subida de imágenes de películas.
- Control de acceso por roles (usuario y administrador).

---

## 🔐 Autenticación y roles

La aplicación utiliza **JSON Web Tokens (JWT)** para la autenticación de usuarios.

### Roles disponibles

- **Usuario**
  - Puede crear reservas.
  - Puede consultar sus reservas y datos personales.

- **Administrador**
  - Acceso completo al panel de administración.
  - Gestión de películas, salas, sesiones, usuarios y películas MVP.

Las rutas protegidas requieren el siguiente header HTTP:
Authorization: Bearer <token>

## 📦 Funcionalidades principales

### 👤 Usuarios
- Registro de usuarios.
- Inicio de sesión.
- Obtención de datos del usuario autenticado.
- Listado de usuarios (solo administrador).

---

### 🎥 Películas
- Crear película (administrador).
- Editar película (administrador).
- Eliminar película (administrador).
- Listar películas activas.
- Obtener el detalle de una película.

---

### ⭐ MVP Películas
- Marcar y desmarcar películas como destacadas (administrador).
- Gestión del carrusel principal del frontend (administrador).

---

### 🏛 Salas
- Crear salas (administrador).
- Listar salas disponibles.

---

### ⏰ Sesiones
- Crear sesiones asociadas a películas y salas (administrador).
- Listar sesiones.
- Filtrar sesiones por fecha.

---

### 🎟 Reservas (Bookings)
- Crear reservas (usuario autenticado).
- Obtener reservas del usuario autenticado.

**Validaciones de negocio:**
- No se permite comprar menús sin entradas.
- No se permite finalizar una compra sin autenticación.

---

### 🖼 Subida de imágenes
- Implementada mediante **Multer**.
- Almacenamiento local en la carpeta `/uploads`.

---

## 🧱 Tecnologías utilizadas
- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose  
- jsonwebtoken  
- multer  
- cors  
- dotenv  
- nodemon  

---

## 📡 Endpoints principales

### 🔐 Autenticación
- `POST /auth/register`
- `POST /auth/login`

---

### 🎥 Películas
- `GET /movies`
- `POST /movies` (admin)
- `PUT /movies/:id` (admin)
- `DELETE /movies/:id` (admin)

---

### 🏛 Salas
- `GET /rooms`
- `POST /rooms` (admin)

---

### ⏰ Sesiones
- `GET /sessions`
- `POST /sessions` (admin)

---

### 🎟 Reservas
- `POST /bookings` (usuario autenticado)
- `GET /bookings/me`

---

## 📌 Notas finales

- Este backend está diseñado para ser consumido por el frontend de **CineVerse**.
- El acceso al panel de administración está protegido por rol.
- Algunas funcionalidades están planificadas para futuras versiones (bloqueo de usuarios, trailers, etc.).

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/samuelmeleroWEB/backendCineverse.git
   cd backendCineverse
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo**
   ```bash
   npm run start
   ```
   Se ejecutará en [http://localhost:4000](http://localhost:4000).

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/cineverse
JWT_SECRET=tu_secreto_jwt
```

## 📁 Estructura del proyecto

```text
config/
controllers/
middlewares/
models/
routes/
services/
server.js
uploads/
.env
package.json

