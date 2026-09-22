export default function Header({ apiOnline }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">MC</span>
        <div>
          <strong>Mission Control</strong>
          <span>Operações da frota</span>
        </div>
      </div>

      <div className={`api-status ${apiOnline ? 'online' : 'offline'}`}>
        <span aria-hidden="true" />
        {apiOnline ? 'API operacional' : 'API indisponível'}
      </div>
    </header>
  );
}
