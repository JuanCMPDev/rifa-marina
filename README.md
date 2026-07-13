# 🌊 Rifa en apoyo a Marina

Página pública del Gran Sorteo Solidario en apoyo a Marina. Muestra el tablero
de 100 fichas (00–99), el estado de cada una en tiempo casi real, una cuenta
regresiva al sorteo y el número ganador cuando se realiza el sorteo.

- **Premio mayor:** $500.000
- **Valor del cupo:** $10.000
- **Sorteo:** sábado **15 de agosto de 2026** con la Lotería de Boyacá (últimas 2 cifras)

## Cómo funciona

La app es solo lectura: el "backend" es una hoja de Google Sheets publicada
como CSV. El frontend la consulta al cargar y luego cada 30 segundos.

### Formato de la sheet

| Columna | Contenido |
|---------|-----------|
| A | Número de la ficha (`0`–`99`, con o sin cero inicial) |
| B | Estado: `available`, `reserved` o `paid` |
| D2 | Número ganador (2 cifras). Vacío hasta la noche del sorteo |

La primera fila puede ser un encabezado; se ignora automáticamente. Números
ausentes en la sheet se muestran como disponibles.

### Configuración

Crea un `.env` con la URL de la sheet publicada como CSV (Archivo → Compartir
→ Publicar en la web → formato CSV; el enlace debe terminar en `pub?output=csv`,
**no** en `pubhtml`):

```
VITE_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
```

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run lint      # eslint
```

## Detección automática del ganador

`scripts/check-winner.js` consulta la API de resultados de la Lotería de
Boyacá y escribe las últimas 2 cifras en la celda `D2` de la sheet.

- El GitHub Action (`.github/workflows/check-winner.yml`) corre cada 5 minutos
  durante la noche del sorteo (15 de agosto de 2026, hora Colombia) y también
  puede lanzarse manualmente con `workflow_dispatch`.
- El script usa la fecha en hora de Colombia (UTC-5) y **se niega a escribir
  antes del día del sorteo** para no publicar un ganador prematuro
  (`--force` lo salta, solo para pruebas).

Requiere los secrets `GOOGLE_SERVICE_ACCOUNT_JSON` y `GOOGLE_SPREADSHEET_ID`
en el repositorio, y que la cuenta de servicio tenga permiso de edición sobre
la sheet.

```bash
npm run check-winner                    # fecha de hoy (Colombia)
node scripts/check-winner.js 2026-08-15 # fecha específica
```

## Checklist para una nueva rifa

1. Duplicar/limpiar la sheet: estados en `available` y celda `D2` vacía.
2. Actualizar la fecha en `src/components/Countdown.jsx` (`DRAW_DATE`),
   `src/components/InfoSection.jsx`, `src/components/WinnerBanner.jsx`,
   `scripts/check-winner.js` (`RAFFLE_DATE`) y el cron del workflow.
3. Verificar `VITE_GOOGLE_SHEET_CSV_URL` si la sheet es nueva.
