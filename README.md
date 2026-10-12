# Examen modelo de ingreso a 2° año 2027 – Matemática

App React + Vite (KaTeX para las fórmulas) basada en el examen en PDF de la E.E.S.T. N° 7 Quilmes.

- Examen fijo de 56 preguntas multiple choice, 100 puntos (mismo puntaje por ejercicio que el PDF).
- Modo examen: se responde todo y se corrige al final (nota sobre 100 + detalle por ejercicio).
- Modo práctica: ejercicios generados al azar (mismos tipos que el examen, otros números), corrección al instante y botón "Otra parecida". Los generadores están en `src/generators.js`.
- En ambos modos: "Ver desarrollo paso a paso" de cada pregunta (tras corregir, o cuando quieras en práctica).
- Modo simulacro: examen NUEVO cada vez (56 preguntas generadas, mismos puntos por ejercicio, 100 en total), con cronómetro y corrección.
- Mis estadísticas: aciertos por ejercicio (examen + simulacro + práctica), historial de notas y botón "Repasar mis errores" (práctica solo de los ejercicios más flojos).
- Las respuestas y estadísticas se guardan en el navegador (localStorage); no se envía nada a ningún servidor.

## Uso
```
npm install
npm run dev      # desarrollo
npm run build    # genera /dist (base './', sirve para GitHub Pages)
```

## Dónde editar
- `src/examData.js`: preguntas, opciones, respuesta correcta y pasos del desarrollo.
  Las fórmulas van entre `$...$` (LaTeX). Un signo de pesos va escapado: `\$450`.
- `src/App.jsx`: lógica de modos, puntaje y pantalla de resultados.
- `src/Figura.jsx`: figura de paralelas del ejercicio 6C.

## Deploy en GitHub Pages
1. Crear un repo (por ejemplo `examen-ingreso-2do-2027`) y subir todo el contenido de esta carpeta a la rama `main`
   (incluye `package-lock.json` y `.github/workflows/deploy.yml`).
2. En GitHub: Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.
3. Cada push a `main` compila y publica. La app queda en `https://<usuario>.github.io/<repo>/`.
4. El `vite.config.js` usa `base: './'`, por lo que funciona con cualquier nombre de repo sin cambiar nada.
