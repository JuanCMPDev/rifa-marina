export default function Footer({ lastUpdated, isLoading }) {
  return (
    <footer className="site-footer">
      <p className="footer-heart">
        Con cariño, por Marina <span aria-hidden="true">💛</span>
      </p>
      <p className="footer-sync">
        {isLoading ? (
          <>
            <span className="sync-dot syncing" aria-hidden="true" />
            Actualizando números…
          </>
        ) : lastUpdated ? (
          <>
            <span className="sync-dot" aria-hidden="true" />
            Actualizado a las{' '}
            {lastUpdated.toLocaleTimeString('es-CO', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </>
        ) : null}
      </p>
    </footer>
  );
}
