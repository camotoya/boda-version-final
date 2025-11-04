# Configuración de Google Analytics

Este documento explica cómo configurar Google Analytics para tu sitio web de boda.

## Paso 1: Crear una propiedad en Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **Administrar** (ícono de engranaje) en la esquina inferior izquierda
4. En la columna "Propiedad", haz clic en **Crear propiedad**
5. Completa el formulario:
   - **Nombre de la propiedad**: "Boda Sofía & Camilo" (o el nombre que prefieras)
   - **Zona horaria**: Selecciona "Bogotá (GMT-5)"
   - **Moneda**: Selecciona "Peso colombiano (COP)"
6. Haz clic en **Siguiente**
7. Completa la información del negocio (puedes seleccionar "Otros" si no aplica)
8. Haz clic en **Crear**

## Paso 2: Obtener tu ID de medición (Measurement ID)

1. Después de crear la propiedad, verás una pantalla con opciones de plataformas
2. Selecciona **Web**
3. Ingresa la URL de tu sitio: `https://camotoya.github.io/boda-version-final/`
4. Ingresa un nombre para el flujo de datos: "Boda Website" (o el nombre que prefieras)
5. Haz clic en **Crear flujo**
6. En la siguiente pantalla, verás tu **ID de medición** (formato: `G-XXXXXXXXXX`)
7. **Copia este ID** - lo necesitarás en el siguiente paso

## Paso 3: Configurar el código en tu sitio web

1. Abre el archivo `index.html` en tu editor
2. Busca la sección `<!-- Google Analytics -->` (línea ~98)
3. Encontrarás dos lugares donde dice `GA_MEASUREMENT_ID`:
   
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

4. Reemplaza **ambas** instancias de `GA_MEASUREMENT_ID` con tu ID de medición real
   
   **Ejemplo:**
   Si tu ID de medición es `G-ABC123XYZ`, el código debería quedar así:
   
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-ABC123XYZ');
   </script>
   ```

5. Guarda el archivo `index.html`

## Paso 4: Verificar la instalación

1. Sube los cambios a tu repositorio de GitHub
2. Espera unos minutos para que GitHub Pages actualice el sitio
3. Visita tu sitio web: `https://camotoya.github.io/boda-version-final/`
4. Ve a Google Analytics → **Informes** → **Tiempo real**
5. Si ves que hay visitantes activos (puede tomar unos minutos), la instalación fue exitosa

## Paso 5: Verificar con Google Tag Assistant (Opcional)

1. Instala la extensión [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk) en Chrome
2. Visita tu sitio web
3. Haz clic en el ícono de Tag Assistant en la barra de herramientas
4. Haz clic en **Enable**
5. Recarga la página
6. Tag Assistant debería mostrar tu tag de Google Analytics con un círculo verde si está funcionando correctamente

## Eventos que se rastrean automáticamente

El código de Google Analytics está configurado para rastrear automáticamente:
- **Vistas de página**: Cada vez que alguien visita una página
- **Tiempo en la página**: Cuánto tiempo pasan los visitantes en el sitio
- **Fuentes de tráfico**: De dónde vienen los visitantes (búsqueda, redes sociales, enlaces directos, etc.)
- **Dispositivos**: Qué dispositivos usan (móvil, tablet, escritorio)
- **Ubicación geográfica**: De dónde son los visitantes

## Notas importantes

- **Privacidad**: Google Analytics recopila datos anónimos de los visitantes. Asegúrate de cumplir con las políticas de privacidad de tu país
- **Tiempo de procesamiento**: Los datos pueden tardar 24-48 horas en aparecer en los informes estándar
- **Tiempo real**: Los datos en tiempo real aparecen casi instantáneamente
- **Filtros**: Puedes crear filtros en Google Analytics para excluir tu propio tráfico si es necesario

## Solución de problemas

### No veo datos en Google Analytics

1. **Verifica que el ID sea correcto**: Asegúrate de haber reemplazado ambas instancias de `GA_MEASUREMENT_ID`
2. **Espera 24-48 horas**: Los informes estándar pueden tardar en aparecer
3. **Usa Tiempo real**: Ve a **Informes** → **Tiempo real** para ver datos inmediatos
4. **Verifica el código**: Abre las herramientas de desarrollador (F12) y busca errores en la consola
5. **Bloqueadores de anuncios**: Algunos bloqueadores pueden impedir que Google Analytics cargue

### El código no carga

1. Verifica que no haya errores de sintaxis en el HTML
2. Asegúrate de que el código esté dentro de las etiquetas `<head>` y `</head>`
3. Verifica tu conexión a internet (el código carga desde Google)
4. Revisa la consola del navegador para ver errores

## Recursos adicionales

- [Documentación oficial de Google Analytics](https://support.google.com/analytics)
- [Guía de inicio rápido](https://support.google.com/analytics/answer/1008015)
- [Centro de ayuda de Google Analytics](https://support.google.com/analytics#topic=9143232)

