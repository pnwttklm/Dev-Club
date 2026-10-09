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

test('restored documents are reachable with full content and current naming', async ({ page }) => {
  const entity = 'Dev Club, Faculty of Information and Communication Technology, Mahidol University';
  for (const route of ['/privacy-policy', '/terms']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(main).toContainText(entity);
    await expect(main).not.toContainText(/ICT20|ICT21|DST2|President Team|under review/);
    await expect(main.locator('[lang="en"]')).toBeVisible();
    await expect(main.locator('[lang="th"]')).toBeVisible();
  }
  await page.goto('/privacy-policy');
  await expect(page.getByRole('heading', { name: 'Data Subject Rights', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Data Breach Notification', exact: true })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('We store your personal data as hard copy and soft copy.');
  await expect(page.getByRole('main')).toContainText('poonyawatt.klu@student.mahidol.ac.th');
  await page.goto('/terms');
  await expect(page.getByRole('heading', { name: 'Your Use of Site', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Applying to the Game', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Game Details', exact: true })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Last updated July 25, 2023. 10:10 AM Indochina Time.');
  const response = await page.goto('/acknowledgement');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Acknowledgement');
  await expect(page.getByText('This website has been developed by', { exact: true })).toBeVisible();
  await expect(page.getByText('Poonyawatt Klumnaim - Faculty of ICT', { exact: true })).toBeVisible();
});

test('retained documents fit narrow and desktop viewports', async ({ page }) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/privacy-policy', '/terms', '/acknowledgement']) {
      await page.goto(route);
      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      const bounds = await main.evaluate(element => ({
        left: element.getBoundingClientRect().left,
        right: element.getBoundingClientRect().right,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }));
      expect(bounds.left).toBeGreaterThanOrEqual(0);
      expect(bounds.right).toBeLessThanOrEqual(width);
      expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.clientWidth);
      if (route !== '/acknowledgement') {
        await page.screenshot({ path: `/tmp/dev-club-${route.slice(1)}-${width}.png` });
      }
    }
  }
});
