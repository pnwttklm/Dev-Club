import { defineConfig } from '@playwright/test';
import config from './playwright.config';

export default defineConfig({ ...config,
  testMatch: 'landing-motion.spec.ts',
  use: { baseURL: 'http://localhost:3101', trace: 'retain-on-failure' },
  webServer: {
    command: 'LANDING_MOTION_TEST=1 npm run dev -- --hostname localhost --port 3101',
    url: 'http://localhost:3101',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
