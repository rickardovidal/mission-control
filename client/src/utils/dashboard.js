export function summarizeRobots(robots) {
  const summary = {
    total: robots.length,
    available: 0,
    assigned: 0,
    maintenance: 0,
  };

  for (const robot of robots) {
    if (robot.status in summary) {
      summary[robot.status] += 1;
    }
  }

  return summary;
}
