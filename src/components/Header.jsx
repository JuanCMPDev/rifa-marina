export default function Header() {
  return (
    <header className="hero">
      <div className="hero-badge reveal r1">
        <span className="badge-dot" aria-hidden="true" />
        Gran Sorteo Solidario
      </div>
      <h1 className="hero-title">
        <span className="hero-kicker reveal r2">Rifa en apoyo a</span>
        <span className="hero-name reveal r3">
          Marina
          <span className="hero-spark spark-1" aria-hidden="true">✦</span>
          <span className="hero-spark spark-2" aria-hidden="true">✦</span>
        </span>
      </h1>
      <p className="hero-subtitle reveal r4">
        Cien fichas, un premio y una noble causa.
        Sumérgete y encuentra tu número de la suerte.
      </p>
    </header>
  );
}
