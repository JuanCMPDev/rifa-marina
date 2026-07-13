export default function ProgressBar({ counts, total }) {
  const sold = counts.paid + counts.reserved;
  const percentage = Math.round((sold / total) * 100) || 0;

  return (
    <section className="progress-section panel reveal r8">
      <div className="progress-header">
        <h2 className="progress-title">Progreso de la rifa</h2>
        <span className="progress-chip">{percentage}% vendido</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de la rifa"
      >
        <div className="progress-fill" style={{ width: `${percentage}%` }}>
          {percentage > 0 && <span className="progress-crest" aria-hidden="true" />}
        </div>
      </div>
      <p className="progress-caption">
        {sold} de {total} números ya tienen dueño — ¡faltan {total - sold}!
      </p>
    </section>
  );
}
