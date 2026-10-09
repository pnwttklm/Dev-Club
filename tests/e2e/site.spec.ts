import { expect, test } from '@playwright/test';

test('home route renders club identity', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText(/At Dev Club ICT Mahidol/)).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
});
