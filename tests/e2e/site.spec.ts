import { expect, test } from '@playwright/test';

test('home route renders club identity', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText(/At Dev Club ICT Mahidol/)).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
});


test('recruitment is closed without applicant requests', async ({ page }) => {
  const dataRequests: string[] = [];
  page.on('request', request => {
    if (['fetch', 'xhr'].includes(request.resourceType())) dataRequests.push(request.url());
  });
  await page.goto('/recruit');
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Applications are currently closed');
  await expect(page.getByText('Recruitment details are being confirmed. Please check back for updates.', { exact: true })).toBeVisible();
  await expect(page.locator('input, form, iframe, [download]')).toHaveCount(0);
  await expect(page.getByPlaceholder(/student id/i)).toHaveCount(0);
  await page.waitForLoadState('networkidle');
  expect(dataRequests).toEqual([]);
  for (const route of ['/recruit/PR_HR', '/recruit/special-recruit']) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/recruit$/);
  }
});

test('training routes stay local', async ({ page }) => {
  await page.goto('/training');
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Training resources are currently unavailable');
  await expect(page.getByText('Training resources will be updated when confirmed.', { exact: true })).toBeVisible();
  for (const route of ['/training/web', '/training/mobile', '/training/bn', '/training/regis']) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/training$/);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Training resources are currently unavailable');
  }
});
