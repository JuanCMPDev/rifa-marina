export default function InfoSection({ winnerNumber }) {
  return (
    <section className="info-section">
      <article className="info-card glass-panel card-prize reveal r6">
        <span className="info-label">Premio mayor</span>
        <span className="info-value value-gold">$500.000</span>
        <span className="info-hint">en efectivo, directo al ganador</span>
      </article>

      <article className="info-card glass-panel card-ticket reveal r7">
        <span className="info-label">Valor del cupo</span>
        <span className="info-value">$10.000</span>
        <span className="info-hint">una ficha, una oportunidad</span>
      </article>

      <article className="info-card glass-panel card-date reveal r8">
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
