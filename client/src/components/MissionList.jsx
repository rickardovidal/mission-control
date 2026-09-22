const statusLabels = {
  planned: 'Planeada',
  in_progress: 'Em curso',
  completed: 'Concluída',
  cancelled: 'Cancelada',
};

export default function MissionList({ missions }) {
  if (missions.length === 0) {
    return <p className="empty-state">Ainda não existem missões registadas.</p>;
  }

  return (
    <div className="mission-list">
      {missions.map((mission) => (
        <article key={mission.missionId}>
          <div className="mission-heading">
            <div>
              <h3>{mission.title}</h3>
              <p>{mission.location}</p>
            </div>
            <span className={`status status-${mission.status}`}>
              {statusLabels[mission.status] || mission.status}
            </span>
          </div>

          <dl className="mission-details">
            <div>
              <dt>Robot</dt>
              <dd>{mission.robot?.name || 'Não atribuído'}</dd>
            </div>
            <div>
              <dt>Prioridade</dt>
              <dd>{mission.priority}</dd>
            </div>
          </dl>

          <div className="mission-team">
            <strong>Equipa</strong>
            <span>
              {mission.operators.length > 0
                ? mission.operators.map((operator) => operator.name).join(', ')
                : 'Sem operadores'}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
