import { useState, useEffect } from 'react';

// Sorteo: sábado 15 de agosto de 2026, ~10:30 pm hora Colombia (Lotería de Boyacá)
const DRAW_DATE = new Date('2026-08-15T22:30:00-05:00');

function getTimeLeft() {
  const diff = DRAW_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

const UNITS = [
  ['days', 'Días'],
  ['hours', 'Horas'],
  ['minutes', 'Min'],
  ['seconds', 'Seg'],
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown glass-panel reveal r5" aria-label="Cuenta regresiva para el sorteo">
      <span className="countdown-label">El sorteo se acerca</span>

      {timeLeft ? (
        <div className="countdown-cells" role="timer" aria-live="off">
          {UNITS.map(([key, label], i) => (
            <span key={key} style={{ display: 'contents' }}>
              {i > 0 && <span className="count-sep" aria-hidden="true">:</span>}
              <div className="count-cell">
                <span className="count-value">
                  {String(timeLeft[key]).padStart(2, '0')}
                </span>
                <span className="count-unit">{label}</span>
              </div>
            </span>
          ))}
        </div>
      ) : (
        <p className="countdown-today">
          ¡Llegó la noche del sorteo! Pronto anunciaremos el número ganador.
        </p>
      )}

      <p className="countdown-footnote">
        Sábado 15 de agosto de 2026 · Juega con la Lotería de Boyacá
      </p>
    </section>
  );
}
