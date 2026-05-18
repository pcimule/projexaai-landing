# ProjexaAI — Landing page

Sitio estático que presenta ProjexaAI y dirige el tráfico al login de la app.

- **App**: https://laguna-property.onrender.com
- **Stack**: HTML + CSS + JS puro (sin build step)
- **Idiomas**: ES (default) / EN / PT
- **Hosting**: Render.com (Static Site) — configurado vía `render.yaml`

## Estructura

```
.
├── index.html        Página única con todas las secciones
├── css/styles.css    Estilos (paleta consistente con la app)
├── js/i18n.js        Traducciones ES/EN/PT + selector
├── js/main.js        Interactividad menor (menú móvil, parallax, año)
├── img/favicon.svg
└── render.yaml       Blueprint de Render
```

## Desarrollo local

Cualquier servidor estático sirve. Por ejemplo:

```bash
python3 -m http.server 8080
# o
npx serve .
```

## Deploy

`render.yaml` define un Static Site en Render con caching agresivo de `/css`, `/js`, `/img`.
El despliegue se dispara automáticamente con cada push a `main`.

## Dominio

Producción: `projexaai.com` (DNS administrado en Squarespace, custom domain configurado en Render).
