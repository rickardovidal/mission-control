import assert from 'node:assert/strict';
import { test } from 'node:test';

import { summarizeRobots } from '../src/utils/dashboard.js';

test('summarizeRobots counts the relevant fleet states', () => {
  const summary = summarizeRobots([
    { status: 'available' },
    { status: 'available' },
    { status: 'assigned' },
    { status: 'maintenance' },
    { status: 'offline' },
  ]);

  assert.deepEqual(summary, {
    total: 5,
    available: 2,
    assigned: 1,
    maintenance: 1,
  });
});

test('summarizeRobots returns zero values for an empty fleet', () => {
  assert.deepEqual(summarizeRobots([]), {
    total: 0,
    available: 0,
    assigned: 0,
    maintenance: 0,
  });
});
