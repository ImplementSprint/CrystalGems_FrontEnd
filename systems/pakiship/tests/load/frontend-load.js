/**
 * k6 Load Test — System B Frontend
 *
 * Run with: k6 run tests/load/frontend-load.js
 *
 * This script simulates concurrent users loading the frontend application
 * and verifies response times remain within acceptable thresholds.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 users
    { duration: '1m',  target: 10 },   // Stay at 10 users
    { duration: '10s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],   // 95% of requests must complete below 500ms
    http_req_failed:   ['rate<0.01'],   // Less than 1% failure rate
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export default function () {
  const res = http.get(BASE_URL);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'page loads fast': (r) => r.timings.duration < 500,
    'body contains html': (r) => r.body.includes('<html') || r.body.includes('<!doctype'),
  });

  sleep(1);
}
