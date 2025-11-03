# Configuración de Google Sheets para Formularios RSVP y Regalos

Este documento explica cómo configurar Google Sheets y Google Apps Script para recibir las respuestas de los formularios RSVP y de Regalos.

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Crea dos hojas de cálculo:
   - **Hoja 1**: Nómbrala "RSVP Responses" (o el nombre que prefieras)
   - **Hoja 2**: Nómbrala "Gifts Responses" (o el nombre que prefieras)
   
4. **Para RSVP Responses**, en la primera fila crea los siguientes encabezados (columnas A-I):

```
A1: Timestamp
B1: Nombre Completo
C1: Email
D1: Teléfono
E1: Asistirá
F1: Menú
G1: Transporte
H1: Canción
I1: Mensaje
```

5. **Para Gifts Responses**, en la primera fila crea los siguientes encabezados (columnas A-F):

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
const RSVP_SHEET_NAME = 'RSVP Responses';
const GIFTS_SHEET_NAME = 'Gifts Responses';
const SCRIPT_PROP = PropertiesService.getScriptProperties();

function initialSetup() {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Setup RSVP sheet
    let rsvpSheet = activeSpreadsheet.getSheetByName(RSVP_SHEET_NAME);
    if (!rsvpSheet) {
        rsvpSheet = activeSpreadsheet.insertSheet(RSVP_SHEET_NAME);
    }
    if (rsvpSheet.getLastRow() === 0) {
        rsvpSheet.getRange(1, 1, 1, 9).setValues([[
            'Timestamp',
            'Nombre Completo',
            'Email',
            'Teléfono',
            'Asistirá',
            'Menú',
            'Transporte',
            'Canción',
            'Mensaje'
        ]]);
        rsvpSheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }
    
    // Setup Gifts sheet
    let giftsSheet = activeSpreadsheet.getSheetByName(GIFTS_SHEET_NAME);
    if (!giftsSheet) {
        giftsSheet = activeSpreadsheet.insertSheet(GIFTS_SHEET_NAME);
    }
    if (giftsSheet.getLastRow() === 0) {
        giftsSheet.getRange(1, 1, 1, 6).setValues([[
            'Timestamp',
            'Nombre',
            'Email',
            'Tipo de Regalo',
            'Monto',
            'Mensaje'
        ]]);
        giftsSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    
    SCRIPT_PROP.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
    const lock = LockService.getPublicLock();
    lock.waitLock(30000);
    
    try {
        const doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
        
        // Parsear JSON del body (aunque el Content-Type sea text/plain)
        const data = JSON.parse(e.postData.contents || '{}');
        
        // Determinar si es RSVP o Gift basado en formType
        // Verificamos explícitamente si es 'gift' o si tiene campos de regalo
        const isGiftForm = data.formType === 'gift' || 
                          (data.contributorName && data.contributionAmount !== undefined);
        
        if (isGiftForm) {
            // Procesar formulario de regalos
            const sheet = doc.getSheetByName(GIFTS_SHEET_NAME);
            
            // Verificar que la hoja existe
            if (!sheet) {
                throw new Error('Hoja "Gifts Responses" no encontrada. Ejecuta initialSetup() primero.');
            }
            
            const nextRow = sheet.getLastRow() + 1;
            
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
                    'row': nextRow,
                    'type': 'gift'
                }))
                .setMimeType(ContentService.MimeType.JSON);
        } else {
            // Procesar formulario RSVP (por defecto)
            const sheet = doc.getSheetByName(RSVP_SHEET_NAME);
            
            // Verificar que la hoja existe
            if (!sheet) {
                throw new Error('Hoja "RSVP Responses" no encontrada. Ejecuta initialSetup() primero.');
            }
            
            const nextRow = sheet.getLastRow() + 1;
            
            const newRow = [
                new Date(),
                data.name || '',
                data.email || '',
                data.phone || '',
                data.attending === 'yes' ? 'Sí' : 'No',
                data.menu || '',
                data.transport === 'yes' ? 'Sí' : 'No',
                data.song || '',
                data.message || ''
            ];
            
            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
            
            return ContentService
                .createTextOutput(JSON.stringify({
                    'result': 'success',
                    'row': nextRow,
                    'type': 'rsvp'
                }))
                .setMimeType(ContentService.MimeType.JSON);
        }
            
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
    return ContentService.createTextOutput('RSVP Form Handler - POST requests only')
        .setMimeType(ContentService.MimeType.TEXT);
}
```

4. Guarda el proyecto con un nombre (ej: "RSVP Handler")
5. Haz clic en **Ejecutar → initialSetup** (primera vez solamente)
6. Da los permisos necesarios cuando te lo solicite

## Paso 3: Desplegar como Web App

**⚠️ IMPORTANTE: Este paso es crucial para que funcione**

1. En Apps Script, haz clic en **Implementar → Nueva implementación**
2. Selecciona:
   - **Tipo**: Aplicación web
   - **Nombre**: RSVP Web App (o el que prefieras)
   - **Ejecutar como**: Yo (tu cuenta)
   - **Quién tiene acceso**: **Cualquiera (incluso anónimo)** ← **ESTO ES CRÍTICO**
3. Haz clic en **Implementar**
4. Copia la **URL de la aplicación web** (debe terminar en `/exec`, algo como: `https://script.google.com/macros/s/.../exec`)
5. Esta URL será tu endpoint

**Nota sobre re-despliegues:** Cada vez que hagas cambios en el código de Apps Script, debes:
- Guardar el proyecto
- Ir a **Implementar → Administrar implementaciones**
- Editar la implementación existente o crear una nueva
- Asegurarte de que "Quién tiene acceso" siga siendo "Cualquiera"
- Guardar una nueva versión antes de desplegar

## Paso 4: Configurar en el sitio web

1. Abre el archivo `script.js`
2. Busca la constante `GOOGLE_SHEETS_URL` en la línea 3
3. Reemplaza `'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'` con la URL que obtuviste en el paso 3
4. Debe quedar algo como:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwjnKwxgm9qgDN8iXdVgEjPyEg51CnBzdYmEiRgVvpabGYnCrRoeGQbPrngfxvG7-6Q/exec';
   ```

**Nota importante:** El código ya está configurado para usar `Content-Type: text/plain`, lo que evita los problemas de CORS preflight. No necesitas hacer cambios adicionales en el código JavaScript.

## Paso 5: Prueba los formularios

1. Abre tu sitio web
2. **Prueba RSVP:**
   - Completa el formulario RSVP
   - Envía el formulario
   - Verifica que los datos aparezcan en la hoja "RSVP Responses"
3. **Prueba Regalos:**
   - Haz clic en "Contribuir" en cualquier regalo
   - Completa el formulario con nombre, email y monto
   - Envía el formulario
   - Verifica que los datos aparezcan en la hoja "Gifts Responses"

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
  - Verifica que las hojas se llamen exactamente "RSVP Responses" y "Gifts Responses" (o los nombres que configuraste)
  - Asegúrate de haber ejecutado `initialSetup()` la primera vez

## Notas de seguridad

- La URL de tu script es pública (está en el código JavaScript)
- Cualquiera puede enviar datos a tu endpoint
- Considera agregar validación adicional en el script si es necesario
- Google Apps Script tiene límites de uso (20,000 requests/día para cuentas gratuitas)

