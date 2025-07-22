import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Esta es la ruta para el BUILD. Asegura que en producción todo funcione.
  base: '/Forja-Voxel/',
  server: {
    // Esto asegura que al hacer 'npm run dev', el navegador se abra en http://localhost:XXXX/
    // y el HMR (Websocket) funcione correctamente.
    open: '/',
  },
});