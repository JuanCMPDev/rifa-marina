import { useEffect, useRef } from 'react';

const CONFETTI_COLORS = [
  '#eab308', '#d97706', '#2f9e6e',
  '#e8795a', '#f5b944', '#7fd6a8',
  '#ffd98a', '#b45309',
];

function generateConfetti(count) {
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    delay: `${(Math.random() * 3).toFixed(2)}s`,
    x: `${(Math.random() * 100).toFixed(1)}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    rotation: `${Math.floor(Math.random() * 360)}deg`,
    shape: i % 3,
    scale: (0.6 + Math.random() * 0.8).toFixed(2),
    drift: `${(-30 + Math.random() * 60).toFixed(0)}px`,
    duration: `${(2.5 + Math.random() * 2).toFixed(2)}s`,
  }));
}

const confettiPieces = generateConfetti(40);

export default function WinnerBanner({ winnerNumber, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 1600);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [onClose]);

  return (
    <div
      className="winner-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Número ganador: ${winnerNumber}`}
    >
      <div
        className="winner-banner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti */}
        <div className="winner-confetti-container" aria-hidden="true">
          {confettiPieces.map((p) => (
            <div
              key={p.key}
              className={`confetti-piece confetti-shape-${p.shape}`}
              style={{
                '--delay': p.delay,
                '--x': p.x,
                '--color': p.color,
                '--rot': p.rotation,
                '--scale': p.scale,
                '--drift': p.drift,
                '--duration': p.duration,
              }}
            />
          ))}
        </div>

        {/* Shimmer sweep */}
        <div className="winner-shimmer" aria-hidden="true" />

        {/* Content */}
        <div className="winner-content">
          <div className="winner-stars" aria-hidden="true">
            <span className="winner-star star-1">★</span>
            <span className="winner-star star-2">★</span>
            <span className="winner-star star-3">★</span>
          </div>

          <div className="winner-badge-label">¡Número Ganador!</div>

          <div className="winner-number-display" aria-live="assertive">
            <span className="winner-number-text">{winnerNumber}</span>
          </div>

          <p className="winner-subtitle">Rifa en apoyo a Marina · 15 de agosto de 2026</p>
          <p className="winner-thanks">¡Gracias por participar!</p>

          <button
            className="winner-close-btn"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Cerrar banner del ganador"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
