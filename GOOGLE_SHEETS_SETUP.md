# Configuración de Google Sheets para Formulario RSVP

Este documento explica cómo configurar Google Sheets y Google Apps Script para recibir las respuestas del formulario RSVP.

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nombra la primera hoja como "RSVP Responses" (o el nombre que prefieras)
4. En la primera fila, crea los siguientes encabezados en las columnas A-I:

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

## Paso 2: Crear Google Apps Script

1. En tu Google Sheet, ve a **Extensiones → Apps Script**
2. Elimina todo el código existente
3. Copia y pega el siguiente código:

```javascript
const SHEET_NAME = 'RSVP Responses';
const SCRIPT_PROP = PropertiesService.getScriptProperties();

function initialSetup() {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = activeSpreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = activeSpreadsheet.insertSheet(SHEET_NAME);
    }

    // Set headers if sheet is empty
    if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, 9).setValues([[
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
        sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    SCRIPT_PROP.setProperty('key', activeSpreadsheet.getId());
}

function withCorsHeaders(output) {
    output.setHeader('Access-Control-Allow-Origin', '*');
    output.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return output;
}

function doPost(e) {
    const lock = LockService.getPublicLock();
    lock.waitLock(30000);

    try {
        const doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
        const sheet = doc.getSheetByName(SHEET_NAME);
        const nextRow = sheet.getLastRow() + 1;

        const data = JSON.parse(e.postData.contents);

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

        const successOutput = ContentService
            .createTextOutput(JSON.stringify({
                result: 'success',
                row: nextRow
            }))
            .setMimeType(ContentService.MimeType.JSON);

        return withCorsHeaders(successOutput);

    } catch (err) {
        const errorOutput = ContentService
            .createTextOutput(JSON.stringify({
                result: 'error',
                error: err.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);

        return withCorsHeaders(errorOutput);
    } finally {
        lock.releaseLock();
    }
}

function doGet() {
    const output = ContentService.createTextOutput('RSVP Form Handler - POST requests only')
        .setMimeType(ContentService.MimeType.TEXT);
    return withCorsHeaders(output);
}

function doOptions() {
    const output = ContentService.createTextOutput('')
        .setMimeType(ContentService.MimeType.TEXT);
    return withCorsHeaders(output);
}
```

4. Guarda el proyecto con un nombre (ej: "RSVP Handler")
5. Haz clic en **Ejecutar → initialSetup** (primera vez solamente)
6. Da los permisos necesarios cuando te lo solicite

## Paso 3: Desplegar como Web App

1. En Apps Script, haz clic en **Implementar → Nueva implementación**
2. Selecciona:
   - **Tipo**: Aplicación web
   - **Nombre**: RSVP Web App (o el que prefieras)
   - **Ejecutar como**: Yo (tu cuenta)
   - **Quién tiene acceso**: Cualquiera
3. Haz clic en **Implementar**
4. Copia la **URL de la aplicación web** (algo como: `https://script.google.com/macros/s/.../exec`)
5. Esta URL será tu endpoint

## Paso 4: Configurar en el sitio web

1. Abre el archivo `script.js`
2. Busca la variable `GOOGLE_SHEETS_URL` (o crea una nueva constante)
3. Reemplaza la URL con la que obtuviste en el paso 3

## Paso 5: Prueba el formulario

1. Abre tu sitio web
2. Completa el formulario RSVP
3. Envía el formulario
4. Verifica que los datos aparezcan en tu Google Sheet

## Solución de problemas

- **Error 401 (No autorizado)**: Asegúrate de que la aplicación web tenga acceso público
- **Error 405 (Método no permitido)**: Verifica que estés usando POST, no GET
- **Datos no aparecen**: Revisa la consola del navegador para ver errores específicos

## Notas de seguridad

- La URL de tu script es pública (está en el código JavaScript)
- Cualquiera puede enviar datos a tu endpoint
- Considera agregar validación adicional en el script si es necesario
- Google Apps Script tiene límites de uso (20,000 requests/día para cuentas gratuitas)

