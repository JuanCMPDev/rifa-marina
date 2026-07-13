export default function ProgressBar({ counts, total }) {
  const sold = counts.paid + counts.reserved;
  const percentage = Math.round((sold / total) * 100) || 0;

  return (
    <section className="tide-section glass-panel reveal r9">
      <div className="tide-header">
        <h2 className="tide-title">La marea sube</h2>
        <span className="tide-chip">{percentage}% vendido</span>
      </div>
      <div
        className="tide-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de la rifa"
      >
        <div className="tide-fill" style={{ width: `${percentage}%` }}>
          {percentage > 0 && <span className="tide-crest" aria-hidden="true" />}
        </div>
      </div>
      <p className="tide-caption">
        {sold} de {total} fichas ya tienen dueño — ¡faltan {total - sold} para completar la meta!
      </p>
    </section>
  );
}
