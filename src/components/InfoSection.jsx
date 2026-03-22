export default function InfoSection({ winnerNumber }) {
  return (
    <section className="info-section">
      <div className="info-card glass-panel">
        <h3>Premio Mayor</h3>
        <p className="highlight">$500.000</p>
      </div>
      <div className="info-card glass-panel">
        <h3>Valor del Cupo</h3>
        <p className="highlight">$10.000</p>
      </div>
      <div className="info-card glass-panel">
        {winnerNumber !== null ? (
          <>
            <h3>Sorteo Realizado</h3>
            <p className="small-text" style={{ marginBottom: '0.25rem' }}>Número ganador</p>
            <p className="highlight winner-result-number">{winnerNumber}</p>
            <p className="small-text">Jugó el 21 de Marzo de 2026 con la Lotería de Boyacá</p>
          </>
        ) : (
          <>
            <h3>Fecha del Sorteo</h3>
            <p>21 de Marzo de 2026</p>
            <p className="small-text">Juega con la Lotería de Boyacá</p>
          </>
        )}
      </div>
    </section>
  );
}
