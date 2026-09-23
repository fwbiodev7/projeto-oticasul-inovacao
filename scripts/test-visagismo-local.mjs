import assert from 'node:assert/strict';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.DEMO_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const cases = [
  ['face-round.png', 'redondo'],
  ['face-square.png', 'quadrado'],
  ['face-long.png', 'alongado'],
  ['face-oval.png', 'oval'],
  ['face-heart.png', 'coração'],
];

async function upload(file) {
  await page.goto(base + '/visagismo');
  await page.locator('input[type="file"]').setInputFiles(file);
}

try {
  const selections = new Set();
  for (const [file, expected] of cases) {
    await upload(path.join(process.cwd(), 'scripts', 'fixtures', file));
    await page.getByRole('button', { name: 'Testar sem usar cota' }).click();
    await page.getByRole('heading', { name: `Formato provável: ${expected}` }).waitFor({ timeout: 30_000 });
    await page.getByText('Resultado experimental calculado no seu aparelho', { exact: false }).waitFor();
    const names = await page.locator('#experimente a[href="#recomendados"] strong').allTextContents();
    assert.equal(names.length, 3, `Três armações para ${expected}`);
    selections.add(names.join('|'));
    console.log(`${file}: ${expected} -> ${names.join(', ')}`);
  }
  assert(selections.size >= 3, 'As escolhas devem variar conforme o contorno');

  await upload(path.join(process.cwd(), 'public', 'images', 'frame-champagne.png'));
  await page.getByRole('button', { name: 'Testar sem usar cota' }).click();
  await page.locator('p[role="alert"]').waitFor({ timeout: 30_000 });
  assert.match(await page.locator('p[role="alert"]').textContent(), /apenas um rosto/);

  let apiRequests = 0;
  await page.route('**/api/visagismo', async route => {
    apiRequests++;
    await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Cota esgotada' }) });
  });
  await upload(path.join(process.cwd(), 'scripts', 'fixtures', 'face-round.png'));
  await page.getByRole('button', { name: 'Analisar com Gemini' }).click();
  await page.getByRole('heading', { name: 'Formato provável: redondo' }).waitFor({ timeout: 30_000 });
  await page.getByText('Resultado experimental calculado no seu aparelho', { exact: false }).waitFor();
  assert.equal(apiRequests, 1, 'A indisponibilidade da API ativa o modo local');
  console.log('Foto sem rosto e fallback de cota: OK');
} finally {
  await browser.close();
}
