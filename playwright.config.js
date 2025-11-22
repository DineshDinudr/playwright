import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false,
    ...devices['Desktop Chrome'],
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'e2e',
      testMatch: 'e2e/**/*.spec.js'
    },
    {
      name: 'performance',
      testMatch: 'performance/**/*.spec.js'
    },
  ],
});

