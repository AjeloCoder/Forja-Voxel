# Forja Vóxel DESARROLLO 🏪🔥

¡Bienvenido a Forja Vóxel! Un e-commerce especializado en impresiones 3D con una apasionada temática de pixel art y estética retro. Este proyecto fue desarrollado como parte de mi formación en programación, combinando tecnologías modernas de frontend con una base de datos en la nube.

[![Forja Vóxel Live](https://img.shields.io/badge/Ver%20Deploy-Forja%20Vóxel-red?style=for-the-badge&logo=github)](https://ajelocoder.github.io/Forja-Voxel/)

---

## 🚀 Sobre el Proyecto

Forja Vóxel no es solo una tienda, es una experiencia. El objetivo fue crear una plataforma de e-commerce completamente funcional, desde la visualización de un catálogo de productos hasta un carrito de compras persistente, todo envuelto en una atmósfera inmersiva inspirada en los videojuegos clásicos de 8 y 16 bits.

La aplicación está construida como una **Single Page Application (SPA)**, asegurando una navegación fluida y sin recargas de página.

---

## ✨ Funcionalidades Clave

*   **Catálogo de Productos Dinámico:** Los productos se cargan directamente desde una base de datos **Firebase Firestore**, permitiendo una gestión fácil y escalable del inventario.
*   **Filtrado por Categorías:** Navega por diferentes categorías de productos con rutas dinámicas.
*   **Página de Detalle de Producto:** Vista individual para cada artículo con descripción completa y opción de compra.
*   **Carrito de Compras Avanzado:**
    *   Gestión de estado global mediante **React Context** y el hook `useReducer`.
    *   Añadir, eliminar y modificar la cantidad de productos.
    *   Cálculo de subtotales y total en tiempo real.
    *   Feedback al usuario mediante notificaciones (`react-hot-toast`).
*   **Diseño Totalmente Responsive:** Una experiencia de usuario adaptada tanto para escritorio como para dispositivos móviles.
*   **Atmósfera Inmersiva:** Una `HomePage` con animaciones y música 8-bit que simula la pantalla de título de un videojuego.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue forjado con las siguientes herramientas:

*   **Frontend:** ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
*   **Base de Datos:** ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
*   **Routing:** `react-router-dom`
*   **Estilos:** CSS Modules & CSS Puro
*   **Iconografía:** `react-icons`
*   **Notificaciones:** `react-hot-toast`
*   **Despliegue:** GitHub Pages

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

Para clonar y correr esta aplicación, necesitarás [Node.js](https://nodejs.org/en/download/) (que incluye npm) instalado en tu computadora.

Desde tu terminal:

```bash
# 1. Clona el repositorio
git clone https://github.com/AjeloCoder/Forja-Voxel.git

# 2. Navega a la carpeta del proyecto
cd Forja-Voxel

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```
¡Ahora puedes abrir [http://localhost:5173/Forja-Voxel/](http://localhost:5173/Forja-Voxel/) en tu navegador!

---

¡Disfruta de la forja!!
