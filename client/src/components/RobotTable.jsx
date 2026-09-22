const statusLabels = {
  available: 'Disponível',
  assigned: 'Em missão',
  maintenance: 'Manutenção',
  offline: 'Offline',
};

export default function RobotTable({ robots }) {
  if (robots.length === 0) {
    return <p className="empty-state">Ainda não existem robots registados.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th>Estado</th>
            <th>Bateria</th>
            <th>Número de série</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr key={robot.robotId}>
              <td data-label="Robot">
                <strong>{robot.name}</strong>
                <span>{robot.model}</span>
              </td>
              <td data-label="Estado">
                <span className={`status status-${robot.status}`}>
                  {statusLabels[robot.status] || robot.status}
                </span>
              </td>
              <td data-label="Bateria">
                <div className="battery-cell">
                  <div className="battery-value">{robot.batteryLevel}%</div>
                  <div className="battery" aria-label={`Bateria a ${robot.batteryLevel}%`}>
                    <span style={{ width: `${robot.batteryLevel}%` }} />
                  </div>
                </div>
              </td>
              <td className="serial-number" data-label="Número de série">{robot.serialNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
