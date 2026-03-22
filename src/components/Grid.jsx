export default function Grid({ numbersState, winnerNumber }) {
  // Garantizar el orden del 00 al 99 siempre, independientemente de cómo venga el objeto de estado
  const numbers = Array.from({ length: 100 }, (_, i) => {
    const numStr = i.toString().padStart(2, '0');
    return [numStr, numbersState[numStr] || 'available'];
  });

  return (
    <section className="grid-section glass-panel">
      <div className="numbers-grid group-by-10">
        {numbers.map(([number, state]) => {
          const isWinner = winnerNumber !== null && number === winnerNumber;
          return (
            <div
              key={number}
              className={`number-cell ${state} read-only${isWinner ? ' winner' : ''}`}
            >
              {number}
            </div>
          );
        })}
      </div>
    </section>
  );
}
