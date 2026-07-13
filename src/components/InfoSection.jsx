export default function InfoSection({ winnerNumber }) {
  return (
    <section className="info-section">
      <article className="info-card panel card-prize reveal r5">
        <span className="info-label">Premio mayor</span>
        <span className="info-value value-gold">$500.000</span>
        <span className="info-hint">en efectivo para el ganador</span>
      </article>

      <article className="info-card panel card-ticket reveal r6">
        <span className="info-label">Valor del número</span>
        <span className="info-value">$10.000</span>
        <span className="info-hint">cada número es una oportunidad</span>
      </article>

      <article className="info-card panel card-date reveal r7">
        {winnerNumber !== null ? (
          <>
            <span className="info-label">Sorteo realizado</span>
            <span className="info-value winner-result-number">{winnerNumber}</span>
            <span className="info-hint">
              Jugó el 15 de agosto de 2026 · Lotería de Boyacá
            </span>
          </>
        ) : (
          <>
            <span className="info-label">Fecha del sorteo</span>
            <span className="info-value">15 de agosto</span>
            <span className="info-hint">2026 · Lotería de Boyacá</span>
          </>
        )}
      </article>
    </section>
  );
}
