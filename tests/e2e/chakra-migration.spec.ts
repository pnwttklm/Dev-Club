import { expect, test } from '@playwright/test';

test('light provider and FAQ hydrate and operate by keyboard', async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|did not match/i.test(message.text())) runtimeErrors.push(message.text());
  });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/light/);
  const trigger = page.getByRole('button', { name: 'What is this club' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('This club is for those who want to learn about working in developer field, not only coding but also Design, art, and QA.', { exact: true })).toBeVisible();
  await page.keyboard.press('Space');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(runtimeErrors).toEqual([]);
});

test('mobile navigation disclosure remains keyboard operable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Toggle Navigation' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('restored policy terms and acknowledgement routes show review notices', async ({ page }) => {
  for (const route of ['/privacy-policy', '/terms', '/acknowledgement']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByText('This page is under review. Updated information will be published when confirmed.', { exact: true })).toBeVisible();
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveCount(1);
  }
});
