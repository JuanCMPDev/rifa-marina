const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  key: i,
  x: `${(Math.random() * 100).toFixed(1)}%`,
  size: `${(4 + Math.random() * 11).toFixed(1)}px`,
  duration: `${(16 + Math.random() * 20).toFixed(1)}s`,
  delay: `${(-Math.random() * 36).toFixed(1)}s`,
  drift: `${(-45 + Math.random() * 90).toFixed(0)}px`,
  opacity: (0.12 + Math.random() * 0.35).toFixed(2),
}));

export default function OceanBackground() {
  return (
    <div className="ocean-bg" aria-hidden="true">
      <div className="ocean-rays" />
      <div className="glow-blob blob-a" />
      <div className="glow-blob blob-b" />
      <div className="glow-blob blob-c" />
      <div className="bubbles">
        {BUBBLES.map((b) => (
          <span
            key={b.key}
            className="bubble"
            style={{
              '--x': b.x,
              '--size': b.size,
              '--duration': b.duration,
              '--delay': b.delay,
              '--drift': b.drift,
              '--o': b.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
