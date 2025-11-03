# 💒 Wedding Website - Sofía & Camilo

Página web moderna y elegante para la boda de Sofía & Camilo.

## ✨ Versión 2.0 - Mejoras Implementadas

Esta versión incluye mejoras significativas en:
- 🎯 **SEO optimizado** para mejor visibilidad en buscadores
- ♿ **Accesibilidad mejorada** siguiendo estándares WCAG
- ⚡ **Rendimiento optimizado** con lazy loading y preload
- 📱 **PWA** - Instalable como aplicación
- 📝 **Formularios mejorados** con validación en tiempo real

👉 Ver [IMPROVEMENTS.md](./IMPROVEMENTS.md) para detalles completos.

## 📍 Ubicación del Proyecto

El proyecto está creado en Windows en la siguiente ubicación:

```
C:\Users\Administrador\Documents\sofia-camilo-wedding
```

### Cómo llegar a esta carpeta desde el Explorador de Windows:

1. Abre el **Explorador de Archivos** de Windows
2. En la barra de direcciones, copia y pega: `C:\Users\Administrador\Documents\sofia-camilo-wedding`
3. O navega manualmente:
   - Ve a **Este equipo** → **Disco Local (C:)** → **Users** → **Administrador** → **Documents** → **sofia-camilo-wedding**

## ✨ Características

- ✅ Diseño responsive y elegante
- ✅ Formularios conectados a Netlify Forms
- ✅ Barras de progreso dinámicas para regalos
- ✅ Mapas de Google Maps integrados
- ✅ Sistema de notificaciones
- ✅ Efectos animados y cuenta regresiva
- ✅ **SEO optimizado** - Meta tags, Open Graph, Twitter Cards
- ✅ **Accesibilidad mejorada** - ARIA labels, navegación por teclado
- ✅ **PWA** - Progressive Web App con service worker
- ✅ **Performance** - Lazy loading de imágenes, preload de recursos
- ✅ **Structured Data** - Schema.org para mejor indexación

## 🚀 Próximos Pasos

### 1. Conectar a GitHub Desktop

1. Abre **GitHub Desktop**
2. Haz clic en **File** → **Add Local Repository**
3. Busca la carpeta: `C:\Users\Administrador\Documents\sofia-camilo-wedding`
4. Haz clic en **Add repository**

### 2. Publicar en GitHub

1. En GitHub Desktop, haz clic en **Publish repository**
2. Elige un nombre (ej: `sofia-camilo-wedding`)
3. Marca la opción para mantener privado si lo deseas
4. Haz clic en **Publish Repository**

### 3. Conectar a Netlify

1. Ve a [Netlify](https://app.netlify.com)
2. Haz clic en **Add new site** → **Import an existing project**
3. Selecciona **GitHub** y autoriza si es necesario
4. Elige tu repositorio `sofia-camilo-wedding`
5. Netlify detectará automáticamente la configuración
6. Haz clic en **Deploy site**

### 4. Configurar Google Maps (Opcional)

1. Obtén una API Key de Google Maps: https://console.cloud.google.com
2. Abre `script.js`
3. Busca `GOOGLE_MAPS_CONFIG` (al final del archivo)
4. Reemplaza `YOUR_GOOGLE_MAPS_API_KEY` con tu API key
5. Actualiza las coordenadas si es necesario

### 5. Agregar Imágenes

1. Crea la carpeta `assets/images/` si no existe
2. Agrega tus imágenes:
   - `Hero.jpg` - Foto principal del hero
   - `foto-hero-mobile.jpg` - Foto para móviles
   - Imágenes de regalos (opcional)
   - Fotos de la galería

## 📊 Ver Datos de Formularios

1. Ve a tu cuenta de Netlify
2. Selecciona tu sitio
3. Ve a **Forms** en el menú
4. Verás dos formularios:
   - `rsvp-form` - Confirmaciones de asistencia
   - `gift-form` - Contribuciones de regalos
5. Haz clic en **Export submissions** para descargar CSV

## 📝 Personalización

- **Nombres**: Edita `index.html`
- **Fechas**: Edita `script.js` (línea 44)
- **Ubicaciones**: Edita direcciones y coordenadas en `script.js`
- **Meta tags y SEO**: Edita los meta tags en el `<head>` de `index.html`
- **URL del sitio**: Actualiza las URLs en los meta tags Open Graph y Twitter Cards con tu dominio real

## 🆕 Mejoras Implementadas

### SEO y Meta Tags
- ✅ Meta tags completos (description, keywords, author)
- ✅ Open Graph tags para compartir en Facebook
- ✅ Twitter Cards para compartir en Twitter
- ✅ Structured Data (Schema.org) para eventos
- ✅ Robots.txt configurado
- ✅ Sitemap listo para generar

### Accesibilidad (WCAG)
- ✅ ARIA labels en todos los elementos interactivos
- ✅ Navegación por teclado mejorada
- ✅ Roles y atributos semánticos correctos
- ✅ Alt text descriptivo en todas las imágenes
- ✅ Focus states visibles
- ✅ Soporte para lectores de pantalla

### Performance
- ✅ Lazy loading en todas las imágenes
- ✅ Preload de recursos críticos
- ✅ Width y height en imágenes para evitar layout shift
- ✅ Integrity checks en recursos externos

### Progressive Web App (PWA)
- ✅ Manifest.json configurado
- ✅ Service Worker para funcionalidad offline
- ✅ Iconos para instalación en dispositivos
- ✅ Theme color configurado

### Formularios
- ✅ Validación en tiempo real mejorada
- ✅ Feedback visual (colores verde/rojo)
- ✅ Atributos aria-invalid para accesibilidad
- ✅ Validación antes de enviar

## 📱 Instalación como PWA

Los usuarios pueden instalar la página como una aplicación en sus dispositivos:
- **Mobile**: Aparecerá un banner de instalación
- **Desktop**: Botón "Instalar" en la barra de direcciones
- **Offline**: La página funcionará sin conexión después de la primera visita

## 🔍 Verificación SEO

Para verificar que todo está configurado correctamente:
1. Usa [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Verifica Open Graph con [Facebook Debugger](https://developers.facebook.com/tools/debug/)
3. Prueba Twitter Cards con [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. Revisa accesibilidad con [WAVE](https://wave.webaim.org/)

