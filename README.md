# Matemática – Intensificación y examen de ingreso

App React + Vite (KaTeX para las fórmulas) con dos secciones:

- **Intensificación** (`#/intensificacion`): recuperación de contenidos adeudados y acreditación de cuatrimestres pendientes. Organizada por curso (1.º a 6.º), sección y cuatrimestre: un modelo en modo práctica y dos exámenes, cada uno con botón «Descargar PDF» (hoja para resolver, sin respuestas; `engine/Printable.jsx`). Están cargados 1.º A, 2.º A y 3.º A.
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

## Sistema de diseño
- `src/index.css` arranca con los **tokens** (color, tipografía, espaciado, bordes, sombras, tamaño mínimo de toque). Todo el CSS usa `var(--...)`: para cambiar la identidad visual se tocan solo los tokens.
- **Modo oscuro**: sigue el tema del sistema y se puede forzar con el botón de la barra (se guarda en el navegador). Los gráficos y figuras SVG quedan sobre un fondo «papel» fijo (`--paper`).
- **Responsive**: pensado para 375 px (móvil), 768 px (tablet) y 1280 px o más (escritorio: ejercicios en dos columnas).
- **Componentes compartidos** (`src/shared/`): `Dialog` (modal con foco atrapado y Esc), `Notice` (éxito / error / aviso / info), `Empty` (estado vacío), `ThemeToggle`, `storage.js`.
- **Accesibilidad**: enlace «Saltar al contenido», foco visible, `aria-current`, `aria-expanded`, barras de progreso con `role="progressbar"`, respuestas marcadas con ícono además del color, `prefers-reduced-motion`.
- **Estados**: vacío (estadísticas, sin respuestas incorrectas), error (página no encontrada, almacenamiento bloqueado, ítems a revisar), éxito (resultado) y cargando («Preparando…» del PDF).

## Quitar el examen de ingreso
1. En `src/sections.js`, borrar `import Ingreso ...` y su bloque en `SECTIONS`.
2. Borrar la carpeta `src/ingreso/`.

## Deploy en GitHub Pages
1. Crear un repo (por ejemplo `examen-ingreso-2do-2027`) y subir todo el contenido de esta carpeta a la rama `main`
   (incluye `package-lock.json` y `.github/workflows/deploy.yml`).
2. En GitHub: Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.
3. Cada push a `main` compila y publica. La app queda en `https://<usuario>.github.io/<repo>/`.
4. El `vite.config.js` usa `base: './'`, por lo que funciona con cualquier nombre de repo sin cambiar nada.
