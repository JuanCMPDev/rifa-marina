export default function ProgressBar({ counts, total }) {
  const sold = counts.paid + counts.reserved;
  const percentage = Math.round((sold / total) * 100) || 0;

  return (
    <section className="progress-section glass-panel">
      <div className="progress-header">
        <h3>Progreso de la Rifa</h3>
        <span className="progress-percentage">{percentage}% Vendido</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="progress-text">
        ¡Faltan {total - sold} cupos para llegar a la meta!
      </p>
    </section>
  );
}
