# INDUANDES PERÚ S.A.C. · Sitio web y plan de seguridad y salud en el trabajo

Sitio estático (HTML, CSS y JavaScript) de la empresa metalmecánica INDUANDES PERÚ S.A.C. (Ventanilla, Callao), con su plan de SST: IPERC, ATS, jerarquía de controles, higiene industrial, EPP, carpeta SUNAFIL e indicadores a 90 días.

Trabajo final del curso **CGEU-271 Seguridad e Higiene Industrial** (SENATI). El caso es ficticio y las imágenes son referenciales.

## Estructura

```
induandes-sst/
├── index.html          Página principal
├── css/
│   └── styles.css      Estilos y animaciones
├── js/
│   └── main.js         Contadores, scroll, pestañas y checklist
├── assets/
│   └── img/            Fotografías e infografía
├── .gitignore
└── README.md
```

## Ver el sitio en tu computadora

Abre la carpeta en VS Code y usa la extensión **Live Server** (clic derecho en `index.html` → *Open with Live Server*). También funciona con doble clic en `index.html`.

## Publicar con GitHub Pages

1. Sube el contenido del proyecto a un repositorio público.
2. Entra a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. Espera 1 o 2 minutos: el sitio queda en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPOSITORIO/`.

## Marco normativo

Ley N° 29783 y su Reglamento (D.S. N° 005-2012-TR), D.S. N° 001-2021-TR, D.S. N° 015-2005-SA, R.M. N° 733-2024-MINSA, Ley N° 28806 y D.S. N° 019-2006-TR.

## Configurar el contacto

Abre `js/config.js` y completa tu número de WhatsApp (con código de país, solo números), el correo y las URL de las redes sociales. Mientras estén vacíos, los botones avisan que falta configurarlos.

El formulario no necesita servidor: arma el mensaje y lo envía por WhatsApp o correo, y para las citas genera un recordatorio `.ics` para el calendario. No incluye pagos en línea.
