# Configuración de Google Sheets para Formulario de Regalos

Este documento explica cómo configurar Google Sheets y Google Apps Script para recibir las contribuciones de regalos.

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo (puede ser en el mismo archivo que RSVP o en uno separado)
3. Nombra la hoja como "Gifts Responses" (o el nombre que prefieras)
4. En la primera fila, crea los siguientes encabezados en las columnas A-F:

```
A1: Timestamp
B1: Nombre
C1: Email
D1: Tipo de Regalo
E1: Monto
F1: Mensaje
```

## Paso 2: Crear Google Apps Script

1. En tu Google Sheet, ve a **Extensiones → Apps Script**
2. Elimina todo el código existente
3. Copia y pega el siguiente código:

```javascript
const SHEET_NAME = 'Gifts Responses';
const SCRIPT_PROP = PropertiesService.getScriptProperties();

function initialSetup() {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = activeSpreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
        sheet = activeSpreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Set headers if sheet is empty
    if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, 6).setValues([[
            'Timestamp',
            'Nombre',
            'Email',
            'Tipo de Regalo',
            'Monto',
            'Mensaje'
        ]]);
        sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    
    SCRIPT_PROP.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
    const lock = LockService.getPublicLock();
    lock.waitLock(30000);
    
    try {
        const doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
        const sheet = doc.getSheetByName(SHEET_NAME);
        const nextRow = sheet.getLastRow() + 1;
        
        // Parsear JSON del body (aunque el Content-Type sea text/plain)
        const data = JSON.parse(e.postData.contents || '{}');
        
        const newRow = [
            new Date(),
            data.contributorName || '',
            data.contributorEmail || '',
            data.giftType || '',
            data.contributionAmount || 0,
            data.contributionMessage || ''
        ];
        
        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
        
        return ContentService
            .createTextOutput(JSON.stringify({
                'result': 'success',
                'row': nextRow
            }))
            .setMimeType(ContentService.MimeType.JSON);
            
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({
                'result': 'error',
                'error': e.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function doGet(e) {
    return ContentService.createTextOutput('Gifts Form Handler - POST requests only')
        .setMimeType(ContentService.MimeType.TEXT);
}
```

4. Guarda el proyecto con un nombre (ej: "Gifts Handler")
5. Haz clic en **Ejecutar → initialSetup** (primera vez solamente)
6. Da los permisos necesarios cuando te lo solicite

## Paso 3: Desplegar como Web App

**⚠️ IMPORTANTE: Este paso es crucial para que funcione**

1. En Apps Script, haz clic en **Implementar → Nueva implementación**
2. Selecciona:
   - **Tipo**: Aplicación web
   - **Nombre**: Gifts Web App (o el que prefieras)
   - **Ejecutar como**: Yo (tu cuenta)
   - **Quién tiene acceso**: **Cualquiera (incluso anónimo)** ← **ESTO ES CRÍTICO**
3. Haz clic en **Implementar**
4. Copia la **URL de la aplicación web** (debe terminar en `/exec`, algo como: `https://script.google.com/macros/s/.../exec`)
5. Esta URL será tu endpoint para regalos

**Nota sobre re-despliegues:** Cada vez que hagas cambios en el código de Apps Script, debes:
- Guardar el proyecto
- Ir a **Implementar → Administrar implementaciones**
- Editar la implementación existente o crear una nueva
- Asegurarte de que "Quién tiene acceso" siga siendo "Cualquiera"
- Guardar una nueva versión antes de desplegar

## Paso 4: Configurar en el sitio web

1. Abre el archivo `script.js`
2. Busca la constante `GOOGLE_SHEETS_GIFTS_URL` en la línea 4
3. Reemplaza `'TU_URL_DE_GOOGLE_APPS_SCRIPT_REGALOS_AQUI'` con la URL que obtuviste en el paso 3
4. Debe quedar algo como:
   ```javascript
   const GOOGLE_SHEETS_GIFTS_URL = 'https://script.google.com/macros/s/AKfycbwjnKwxgm9qgDN8iXdVgEjPyEg51CnBzdYmEiRgVvpabGYnCrRoeGQbPrngfxvG7-6Q/exec';
   ```

**Nota importante:** El código ya está configurado para usar `Content-Type: text/plain`, lo que evita los problemas de CORS preflight. El tipo de regalo se establece automáticamente según el botón que se presionó.

## Paso 5: Prueba el formulario

1. Abre tu sitio web
2. Haz clic en "Contribuir" en cualquier regalo
3. Completa el formulario con nombre, email y monto
4. Envía el formulario
5. Verifica que los datos aparezcan en la hoja "Gifts Responses" con el tipo de regalo correcto

## Solución de problemas

### Error CORS (Access-Control-Allow-Origin)

Si ves errores de CORS en la consola del navegador:

1. **Verifica el despliegue**: Asegúrate de que la aplicación web tenga acceso "Cualquiera (incluso anónimo)"
2. **Re-despliega**: Guarda una nueva versión y vuelve a desplegar
3. **Verifica el Content-Type**: En la consola del navegador (pestaña Network), confirma que el request tenga `Content-Type: text/plain;charset=utf-8`. Si ves `application/json`, hay un problema con el código JavaScript
4. **Limpia la caché**: Prueba en una ventana privada/incógnito

### Otros errores comunes

- **Error 401 (No autorizado)**: Asegúrate de que la aplicación web tenga acceso público ("Cualquiera")
- **Error 405 (Método no permitido)**: Verifica que estés usando POST, no GET
- **Error 500 (Error interno)**: Revisa el código de `doPost` en Apps Script, especialmente la función `initialSetup()` debe haberse ejecutado al menos una vez
- **Datos no aparecen**: 
  - Revisa la consola del navegador para ver errores específicos
  - Verifica que la hoja se llame exactamente "Gifts Responses" (o el nombre que configuraste en `SHEET_NAME`)
  - Asegúrate de haber ejecutado `initialSetup()` la primera vez
- **Tipo de regalo incorrecto**: Verifica que el botón "Contribuir" esté llamando a `openGiftModal()` con el tipo correcto

## Notas de seguridad

- La URL de tu script es pública (está en el código JavaScript)
- Cualquiera puede enviar datos a tu endpoint
- Considera agregar validación adicional en el script si es necesario
- Google Apps Script tiene límites de uso (20,000 requests/día para cuentas gratuitas)

