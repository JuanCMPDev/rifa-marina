import { useState, useEffect } from 'react';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import ProgressBar from './components/ProgressBar';
import Grid from './components/Grid';
import Footer from './components/Footer';
import WinnerBanner from './components/WinnerBanner';

const TOTAL_NUMBERS = 100;

function App() {
  // Estado inicial
  const [numbersState, setNumbersState] = useState(() => {
    const initialState = {};
    for (let i = 0; i < TOTAL_NUMBERS; i++) {
      const numStr = i.toString().padStart(2, '0');
      initialState[numStr] = 'available';
    }
    return initialState;
  });

  const [winnerNumber, setWinnerNumber] = useState(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // INTEGRACIÓN CON GOOGLE SHEETS
  useEffect(() => {
    const fetchSheetData = async () => {
      // Reemplaza esta URL con la URL de tu hoja de cálculo de Google publicada como CSV
      // Se recomienda usar variables de entorno: import.meta.env.VITE_GOOGLE_SHEET_CSV_URL
      const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || '';
      
      if (!GOOGLE_SHEET_CSV_URL) {
        console.warn("No hay URL configurada en VITE_GOOGLE_SHEET_CSV_URL");
        return; 
      }

      setIsLoading(true);
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const csvText = await response.text();
        
        // Detección de error común: El usuario pegó el enlace a 'pubhtml' en lugar de 'pub?output=csv'
        if (csvText.trim().toLowerCase().startsWith('<!doctype html>') || csvText.trim().toLowerCase().startsWith('<html')) {
          console.error("❌ ERROR CRÍTICO: El enlace proporcionado está descargando una página web (HTML), no un archivo CSV.");
          console.error("Por favor, asegúrate de que el enlace en tu .env termina en 'pub?output=csv' y NO en 'pubhtml'.");
          return; // Abortar procesamiento para no romper la app
        }

        // Parsear el CSV
        // Soporta separadores de coma (,) o punto y coma (;) dependiendo de la región de Google Sheets
        const lines = csvText.split(/\r?\n/);
        const newState = {};
        let detectedWinner = null;

        lines.forEach((line) => {
          const parts = line.split(/[,;]/);
          if (parts.length >= 2) {
            const numRaw = parts[0].trim();
            const stateRaw = parts[1].trim().toLowerCase();

            // Validar que la primera columna sea realmente un número (así ignoramos la fila de encabezados automáticamente)
            if (/^\d+$/.test(numRaw)) {
              const num = numRaw.padStart(2, '0');

              // Mapeo flexible por si escriben en mayúsculas o con espacios
              if (['available', 'reserved', 'paid'].includes(stateRaw)) {
                newState[num] = stateRaw;
              }
            }

            // Columna D (índice 3): número ganador (00-99)
            if (parts.length >= 4) {
              const colD = parts[3].trim();
              if (/^\d{1,2}$/.test(colD)) {
                const val = parseInt(colD, 10);
                if (val >= 0 && val <= 99) {
                  detectedWinner = colD.padStart(2, '0');
                }
              }
            }
          }
        });

        // Mostrar banner si se detecta un ganador nuevo
        if (detectedWinner !== null) {
          setWinnerNumber(prev => {
            if (prev !== detectedWinner) {
              setBannerVisible(true);
            }
            return detectedWinner;
          });
        } else {
          setWinnerNumber(null);
        }

        // Combinar datos del Excel con el estado por defecto (por si faltan números en la lista)
        const finalState = {};
        for (let i = 0; i < TOTAL_NUMBERS; i++) {
          const numStr = i.toString().padStart(2, '0');
          finalState[numStr] = newState[numStr] || 'available';
        }

        setNumbersState(finalState);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error al obtener datos de Google Sheets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();

    // Auto-refresh cada 30 segundos para detectar el número ganador en tiempo real
    const interval = setInterval(fetchSheetData, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const counts = Object.values(numbersState).reduce(
    (acc, state) => {
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    },
    { available: 0, reserved: 0, paid: 0 }
  );

  return (
    <>
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {bannerVisible && winnerNumber !== null && (
        <WinnerBanner
          winnerNumber={winnerNumber}
          onClose={() => setBannerVisible(false)}
        />
      )}

      <div className="app-container">
        <div className="container">
          <Header />
        </div>
        <main className="container">
          <InfoSection winnerNumber={winnerNumber} />
          <ProgressBar counts={counts} total={TOTAL_NUMBERS} />

          <div className="status-bar" style={{ justifyContent: 'center' }}>
             <div className="legend glass-panel inline-legend">
                <span className="legend-item"><div className="box available"></div> Disponible</span>
                <span className="legend-item"><div className="box reserved"></div> Reservada</span>
                <span className="legend-item"><div className="box paid"></div> Pagada</span>
             </div>
          </div>

          <Grid numbersState={numbersState} winnerNumber={winnerNumber} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
