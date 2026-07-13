const MOTES = Array.from({ length: 12 }, (_, i) => ({
  key: i,
  x: `${(Math.random() * 100).toFixed(1)}%`,
  size: `${(3 + Math.random() * 6).toFixed(1)}px`,
  duration: `${(20 + Math.random() * 24).toFixed(1)}s`,
  delay: `${(-Math.random() * 44).toFixed(1)}s`,
  drift: `${(-40 + Math.random() * 80).toFixed(0)}px`,
  opacity: (0.15 + Math.random() * 0.3).toFixed(2),
}));

export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="light-blob blob-a" />
      <div className="light-blob blob-b" />
      <div className="light-blob blob-c" />
      <div className="motes">
        {MOTES.map((m) => (
          <span
            key={m.key}
            className="mote"
            style={{
              '--x': m.x,
              '--size': m.size,
              '--duration': m.duration,
              '--delay': m.delay,
              '--drift': m.drift,
              '--o': m.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
