# 💒 Wedding Website - Sofía & Camilo

Página web moderna y elegante para la boda de Sofía & Camilo.

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

- Diseño responsive y elegante
- Formularios conectados a Netlify Forms
- Barras de progreso dinámicas para regalos
- Mapas de Google Maps integrados
- Sistema de notificaciones
- Efectos animados y cuenta regresiva

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

