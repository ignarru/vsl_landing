/* 404 con la misma estética. Con `output: "export"` Next lo emite como `404.html`, que es
   el que Cloudflare Pages sirve para cualquier ruta inexistente. */
export default function NotFound() {
  return (
    <main id="contenido" className="nf">
      <div className="nf-box framed">
        <span className="tech">Hoja no encontrada · 404</span>
        <h1 className="nf-title">Esta página no existe.</h1>
        <p className="nf-text">
          Puede que el link esté mal escrito o que la hoja se haya movido. Lo que sí existe es
          la página principal, y la llamada.
        </p>
        <div className="nf-actions">
          <a href="/" className="btn-primary">
            Volver al inicio<span aria-hidden="true">→</span>
          </a>
          <a href="https://cal.com/ignacio.arruvito/iabyia" className="btn-ghost" data-cta="nav">
            Agendar la llamada<span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
