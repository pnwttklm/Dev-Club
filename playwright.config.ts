import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Browser acceptance runs against a freshly built production application.
  workers: 1,
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  webServer: {
    command: 'npm run build && npm run start -- --hostname localhost --port 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
