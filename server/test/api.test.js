import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';

import request from 'supertest';

import app from '../src/app.js';
import sequelize from '../src/config/database.js';

before(async () => {
  await sequelize.authenticate();
});

after(async () => {
  await sequelize.close();
});

test('GET /api/health confirms that the API is running', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('GET /api/robots returns the robots from the database', async () => {
  const response = await request(app).get('/api/robots');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.data));
  assert.ok(response.body.data.length > 0);
});

test('POST /api/robots rejects incomplete data', async () => {
  const response = await request(app).post('/api/robots').send({
    name: 'Incomplete robot',
  });

  assert.equal(response.status, 422);
  assert.equal(response.body.error.code, 'VALIDATION_ERROR');
});

test('GET /api/operators returns the registered operators', async () => {
  const response = await request(app).get('/api/operators');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.data));
  assert.ok(response.body.data.length > 0);
  assert.ok(response.body.data[0].operatorId);
});

test('GET /api/missions returns missions with robot and operators', async () => {
  const response = await request(app).get('/api/missions');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.data));
  assert.ok(response.body.data.length > 0);
  assert.ok(response.body.data[0].robot);
  assert.ok(Array.isArray(response.body.data[0].operators));
});
