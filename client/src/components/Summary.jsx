export default function Summary({ fleet, missionCount, operatorCount }) {
  const items = [
    ['Robots registados', fleet.total],
    ['Disponíveis', fleet.available],
    ['Missões', missionCount],
    ['Operadores', operatorCount],
  ];

  return (
    <dl className="summary">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
