import { useEffect, useMemo, useState } from 'react';

import { createRobot, getDashboardData } from './api.js';
import Header from './components/Header.jsx';
import MissionList from './components/MissionList.jsx';
import RobotForm from './components/RobotForm.jsx';
import RobotTable from './components/RobotTable.jsx';
import Summary from './components/Summary.jsx';
import { summarizeRobots } from './utils/dashboard.js';

export default function App() {
  const [robots, setRobots] = useState([]);
  const [operators, setOperators] = useState([]);
  const [missions, setMissions] = useState([]);
  const [apiOnline, setApiOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardData();
        setRobots(data.robots);
        setOperators(data.operators);
        setMissions(data.missions);
        setApiOnline(data.apiOnline);
      } catch {
        setError('Não foi possível carregar os dados. Confirma se a API está ligada.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const fleet = useMemo(() => summarizeRobots(robots), [robots]);

  async function handleCreateRobot(robotData) {
    setSaving(true);
    setError('');

    try {
      const robot = await createRobot(robotData);
      setRobots((current) => [...current, robot]);
      return true;
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message || 'Não foi possível registar o robot.');
      return false;
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Header apiOnline={apiOnline} />

      <main>
        <div className="page-heading">
          <div>
            <h1>Estado das operações</h1>
            <p>Frota, missões e equipas num único painel.</p>
          </div>
          <span>Dados obtidos através da API REST</span>
        </div>

        {error && <div className="error-message" role="alert">{error}</div>}

        {loading ? (
          <p className="loading">A carregar operações…</p>
        ) : (
          <>
            <Summary fleet={fleet} missionCount={missions.length} operatorCount={operators.length} />

            <div className="dashboard-grid">
              <section className="panel fleet-panel">
                <div className="section-heading">
                  <div>
                    <h2>Frota</h2>
                    <p>{robots.length} robots registados</p>
                  </div>
                </div>
                <RobotTable robots={robots} />
              </section>

              <section className="panel mission-panel">
                <div className="section-heading">
                  <div>
                    <h2>Missões</h2>
                    <p>Planeamento e equipas atribuídas</p>
                  </div>
                </div>
                <MissionList missions={missions} />
              </section>
            </div>

            <section className="panel form-panel">
              <div className="section-heading">
                <div>
                  <h2>Novo robot</h2>
                  <p>Regista uma unidade na frota.</p>
                </div>
              </div>
              <RobotForm onCreate={handleCreateRobot} saving={saving} />
            </section>
          </>
        )}
      </main>
    </>
  );
}
