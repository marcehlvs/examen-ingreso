# Matemática – Intensificación y examen de ingreso

App React + Vite (KaTeX para las fórmulas) con dos secciones:

- **Intensificación** (`#/intensificacion`): recuperación de contenidos adeudados y acreditación de cuatrimestres pendientes. Organizada por curso (1.º a 6.º), sección y cuatrimestre: un modelo en modo práctica y dos exámenes, cada uno con botón «Descargar PDF» (hoja para resolver, sin respuestas; `engine/Printable.jsx`). Está cargado 1.º A.
- **Examen de ingreso** (`#/ingreso`, temporal): tres exámenes de 100 puntos, con corrección al final, desarrollo paso a paso, cronómetro y estadísticas. Las respuestas se guardan solo en el navegador (localStorage).

## Uso
```
npm install
npm run dev      # desarrollo
npm run build    # genera /dist
```

## Estructura
- `src/sections.js`: lista de secciones (portada y menú).
- `src/intensificacion/`: sección de intensificación `data/courses.js` define cursos y secciones, `data/1A.js` el contenido y `engine/` la corrección y los gráficos.
- `src/ingreso/`: todo lo del examen de ingreso. La etiqueta «Nuevo» se controla con `NEW_EXAMS` en `Ingreso.jsx`.
- `src/shared/Rich.jsx`: fórmulas entre `$...$` (LaTeX). Un signo de pesos va escapado: `\$450`.

## Quitar el examen de ingreso
1. En `src/sections.js`, borrar `import Ingreso ...` y su bloque en `SECTIONS`.
2. Borrar la carpeta `src/ingreso/`.

## Deploy en GitHub Pages
1. Crear un repo (por ejemplo `examen-ingreso-2do-2027`) y subir todo el contenido de esta carpeta a la rama `main`
   (incluye `package-lock.json` y `.github/workflows/deploy.yml`).
2. En GitHub: Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.
3. Cada push a `main` compila y publica. La app queda en `https://<usuario>.github.io/<repo>/`.
4. El `vite.config.js` usa `base: './'`, por lo que funciona con cualquier nombre de repo sin cambiar nada.
