const STATE_LABELS = {
  available: 'disponible',
  reserved: 'reservada',
  paid: 'pagada',
};

export default function Grid({ numbersState, winnerNumber }) {
  // Garantizar el orden del 00 al 99 siempre, independientemente de cómo venga el objeto de estado
  const numbers = Array.from({ length: 100 }, (_, i) => {
    const numStr = i.toString().padStart(2, '0');
    return [numStr, numbersState[numStr] || 'available'];
  });

  return (
    <section className="grid-section glass-panel reveal r10" aria-label="Tablero de números de la rifa">
      <div className="numbers-grid">
        {numbers.map(([number, state], i) => {
          const isWinner = winnerNumber !== null && number === winnerNumber;
          const label = isWinner ? 'número ganador' : STATE_LABELS[state];
          return (
            <div
              key={number}
              className={`number-cell ${state}${isWinner ? ' winner' : ''}`}
              style={{ '--i': i }}
              title={`Ficha ${number} · ${label}`}
              aria-label={`Ficha ${number}: ${label}`}
            >
              {number}
            </div>
          );
        })}
      </div>
    </section>
  );
}
