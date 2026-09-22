import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export async function getDashboardData() {
  const [health, robots, operators, missions] = await Promise.all([
    api.get('/health'),
    api.get('/robots'),
    api.get('/operators'),
    api.get('/missions'),
  ]);

  return {
    apiOnline: health.data.status === 'ok',
    robots: robots.data.data,
    operators: operators.data.data,
    missions: missions.data.data,
  };
}

export async function createRobot(robotData) {
  const response = await api.post('/robots', robotData);
  return response.data.data;
}
