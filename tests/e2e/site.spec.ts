import { expect, test } from '@playwright/test';

test('legacy section routes redirect to homepage anchors', async ({ page }) => {
  for (const [route, anchor] of [['/team', 'teams'], ['/q', 'faqs']]) {
    await page.goto(route);
    await expect(page).toHaveURL(`http://localhost:3100/#${anchor}`);
  }
});

test('retired routes show not-found', async ({ page }) => {
  for (const route of ['/test', '/terms', '/privacy-policy', '/acknowledgement', '/tracking/fw', '/404', '/500', '/_error']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Page not found');
    await expect(page.getByRole('main').getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
    await expect(page.locator('meta[http-equiv="refresh"]')).toHaveCount(0);
  }
});

test('footer has no retired links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="/terms"], a[href="/privacy-policy"], a[href="/acknowledgement"]')).toHaveCount(0);
});

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
