import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Un solo index.html con JS, CSS y fuentes de KaTeX embebidos:
// se puede abrir con doble clic o subir a cualquier hosting estático.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: '/examen-ingreso/',
})
