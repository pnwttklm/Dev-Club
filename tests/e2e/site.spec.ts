import { expect, test } from '@playwright/test';

test('legacy section routes redirect to homepage anchors', async ({ page }) => {
  for (const [route, anchor] of [['/team', 'teams'], ['/q', 'faqs']]) {
    await page.goto(route);
    await expect(page).toHaveURL(`http://localhost:3100/#${anchor}`);
  }
});

test('footer links for policy, terms, and acknowledgement are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="/terms"]')).toBeVisible();
  await expect(page.locator('a[href="/privacy-policy"]')).toBeVisible();
  await expect(page.locator('a[href="/acknowledgement"]')).toBeVisible();
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

const anchors = [['About Us', 'about'], ['Why Dev Club', 'why-us'], ['Teams', 'teams'], ['FAQ', 'faqs']];
test('landing semantics and navigation destinations', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const [label, id] of anchors) {
    await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', `/#${id}`);
    await expect(page.locator(`main section#${id}`)).toHaveCount(1);
  }
  await expect(nav.getByRole('link', { name: 'Dev Club home' })).toHaveAttribute('href', '/');
  await expect(nav.getByRole('link', { name: 'Joining information' })).toHaveAttribute('href', '/recruit');
  await nav.getByRole('link', { name: 'Why Dev Club' }).click();
  await expect.poll(() => page.locator('#why-us').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeLessThanOrEqual(100);
  expect(await page.locator('#why-us').evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(80);
  await expect(page.locator('[data-motion-state="active"]')).toHaveCount(1);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.mouse.move(100, 200);
  const samplesPromise = page.evaluate(async () => {
    const samples: number[] = [];
    for (let n = 0; n < 40; n++) {
      await new Promise(requestAnimationFrame);
      samples.push(scrollY);
    }
    return samples;
  });
  await page.mouse.wheel(0, 500);
  const samples = await samplesPromise;
  expect(new Set(samples.map(Math.round)).size).toBeGreaterThan(8);
});

for (const width of [320, 390, 768, 1024, 1280]) {
  test(`landing fits and images load at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    await page.waitForLoadState('networkidle');
    const defects = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      outside: [...document.querySelectorAll('main *, nav *, footer *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1); }).map(el => el.tagName),
      images: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
    }));
    expect(defects).toEqual({ overflow: false, outside: [], images: [] });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `/tmp/task5-${width}.png`, fullPage: true });
  });
}

test('team title foregrounds have sufficient contrast', async ({ page }) => {
  await page.goto('/');
  for (const name of ['FRONTEND WEB', 'Quality Assurance']) {
    expect(await page.getByRole('heading', { name, exact: true }).evaluate(el => getComputedStyle(el).color)).toBe('rgb(0, 0, 0)');
  }
});

test('mobile disclosure and FAQ work with keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Dev Club home' })).toBeFocused();
  await page.keyboard.press('Tab');
  const menu = page.getByRole('button', { name: 'Toggle Navigation' });
  await expect(menu).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'About Us', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await page.keyboard.press('Space');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('link', { name: 'FAQ', exact: true }).press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  const faq = page.getByRole('button', { name: 'What is this club' });
  await faq.focus();
  await page.keyboard.press('Enter');
  await expect(faq).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('This club is for those')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(faq).toHaveAttribute('aria-expanded', 'false');
});

test('reduced motion preserves immediate anchor access', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

const retainedRoutes = ['/', '/recruit', '/training', '/tracking/fw', '/privacy-policy', '/terms', '/acknowledgement', '/not-a-real-route'];

test('navigation has no hydration or runtime errors', async ({ page }) => {
  const runtimeErrors: string[] = [];
  const hydrationErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|did not match|server rendered|hydrating/i.test(message.text())) hydrationErrors.push(message.text());
  });
  for (const route of retainedRoutes) {
    await page.goto(route);
    await expect(page.getByRole('main')).toBeVisible();
    await page.waitForLoadState('networkidle');
  }
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Joining information' }).click();
  await expect(page).toHaveURL(/\/recruit$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Applications are currently closed');
  expect(runtimeErrors).toEqual([]);
  expect(hydrationErrors).toEqual([]);
});

test('skip-link Enter focuses the only main landmark on every retained route', async ({ page }) => {
  for (const route of retainedRoutes) {
    await page.goto(route);
    await expect(page.getByRole('main')).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('main')).toBeFocused();
    await expect(page.getByRole('main')).toHaveAttribute('id', 'main-content');
  }
});

for (const width of [320, 390, 768, 1024, 1280]) {
  test(`retained routes fit and images load at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of retainedRoutes.slice(1)) {
      await page.goto(route);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }
      expect(await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        outside: [...document.querySelectorAll('main *, nav *, footer *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1); }).map(el => el.tagName),
        broken: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
      }))).toEqual({ overflow: false, outside: [], broken: [] });
      await page.screenshot({ path: `/tmp/task6-${route.slice(1).replaceAll('/', '-')}-${width}.png`, fullPage: true });
    }
  });
}

test('tracking keeps visitors local with an unavailable status', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', request => {
    if (!new URL(request.url()).hostname.match(/^(localhost|127\.0\.0\.1)$/)) externalRequests.push(request.url());
  });
  await page.goto('/tracking/fw');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Frontend tracking is currently unavailable');
  await expect(page.getByRole('main').getByRole('link', { name: 'Back to Dev Club' })).toHaveAttribute('href', '/');
  await page.waitForLoadState('networkidle');
  expect(externalRequests).toEqual([]);
});
