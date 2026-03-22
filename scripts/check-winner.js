/**
 * check-winner.js
 *
 * Consulta los resultados de la Lotería de Boyacá y actualiza el número
 * ganador (últimas 2 cifras) en la columna D del Google Sheet de la rifa.
 *
 * Uso:
 *   node scripts/check-winner.js                  # usa la fecha de hoy
 *   node scripts/check-winner.js 2026-03-21       # fecha específica
 *
 * Requiere:
 *   - service-account.json en la raíz del proyecto
 *   - GOOGLE_SPREADSHEET_ID en .env
 *   - WINNER_CELL en .env (opcional, default "D2")
 */

import { google } from 'googleapis';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Configuración ──────────────────────────────────────────────────
const LOTTERY_API = 'https://api-resultadosloterias.com/api/results';
const LOTTERY_SLUG = 'boyaca';

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const WINNER_CELL = process.env.WINNER_CELL || 'D2';
const SERVICE_ACCOUNT_PATH = resolve(__dirname, '..', 'service-account.json');

// ─── 1. Consultar la API de la lotería ──────────────────────────────
async function fetchLotteryResult(date) {
  const url = `${LOTTERY_API}/${date}`;
  console.log(`Consultando resultados para ${date}...`);
  console.log(`  → ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API respondió con status ${res.status}`);
  }

  const json = await res.json();

  if (json.status !== 'success' || !Array.isArray(json.data)) {
    throw new Error(`Respuesta inesperada de la API: ${JSON.stringify(json).slice(0, 200)}`);
  }

  const boyaca = json.data.find((r) => r.slug === LOTTERY_SLUG);
  if (!boyaca) {
    console.log(`No hay resultados de la Lotería de Boyacá para ${date}.`);
    console.log(`Loterías disponibles: ${json.data.map((r) => r.slug).join(', ') || '(ninguna)'}`);
    return null;
  }

  const fullNumber = boyaca.result;
  const lastTwo = fullNumber.slice(-2);
  console.log(`Resultado Lotería de Boyacá: ${fullNumber} (serie ${boyaca.series})`);
  console.log(`Últimas 2 cifras (número de la rifa): ${lastTwo}`);

  return lastTwo;
}

// ─── 2. Actualizar Google Sheet ─────────────────────────────────────
async function updateSheet(winnerNumber) {
  if (!SPREADSHEET_ID) {
    console.log('\n⚠️  GOOGLE_SPREADSHEET_ID no configurado en .env');
    console.log(`   Pon "${winnerNumber}" manualmente en la celda ${WINNER_CELL}.`);
    return false;
  }

  let credentials;
  try {
    credentials = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  } catch {
    console.log(`\n⚠️  No se encontró ${SERVICE_ACCOUNT_PATH}`);
    console.log(`   Pon "${winnerNumber}" manualmente en la celda ${WINNER_CELL}.`);
    return false;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Leer valor actual para no sobreescribir si ya está puesto
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: WINNER_CELL,
  });

  const currentValue = current.data.values?.[0]?.[0]?.trim();
  if (currentValue === winnerNumber) {
    console.log(`\nLa celda ${WINNER_CELL} ya tiene el valor "${winnerNumber}". Sin cambios.`);
    return true;
  }

  if (currentValue && currentValue !== winnerNumber) {
    console.log(`\n⚠️  La celda ${WINNER_CELL} ya tiene "${currentValue}" (diferente a "${winnerNumber}").`);
    console.log('   Actualizando de todas formas...');
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: WINNER_CELL,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[winnerNumber]],
    },
  });

  console.log(`\n✅ Celda ${WINNER_CELL} actualizada con "${winnerNumber}".`);
  return true;
}

// ─── 3. Main ────────────────────────────────────────────────────────
async function main() {
  const date = process.argv[2] || new Date().toISOString().split('T')[0];

  const winnerNumber = await fetchLotteryResult(date);

  if (winnerNumber === null) {
    console.log('\nNo se encontró resultado. Puedes reintentar más tarde.');
    process.exit(0);
  }

  await updateSheet(winnerNumber);
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
