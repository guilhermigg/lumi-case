import { describe, expect, beforeAll, test } from 'vitest';

describe('API Healthcheck', () => {
  let response : Response;

  beforeAll(async () => {
    response = await fetch('http://localhost:5000/healthcheck');
  });

  test('Status do Healthcheck deve ser 200 OK', () => {
    expect(response.status).toBe(200)
  })
});