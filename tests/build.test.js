import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSite } from '../scripts/build.mjs';

for (const basePath of ['/', '/albracom-piel/']) {
  test(`Construye enlaces para ${basePath}`, async () => {
    const output = await mkdtemp(join(tmpdir(), 'albracom-build-'));
    try {
      await buildSite({ phone: '15555550123', basePath, output });
      const html = await readFile(join(output, 'index.html'), 'utf8');
      assert.ok(html.includes(`src="${basePath}app.js"`));
      assert.ok(html.includes(`href="${basePath}style.css"`));
      assert.ok(html.includes(`href="${basePath}"`));
      assert.ok(html.includes('phone=15555550123'));
      assert.ok(!html.includes('__WHATSAPP_PHONE__'));
      assert.ok((await readFile(join(output, 'config.js'), 'utf8')).includes('15555550123'));
      assert.equal(await readFile(join(output, '.nojekyll'), 'utf8'), '');
    } finally { await rm(output, { recursive: true, force: true }); }
  });
}
test('No publica sin contacto ni admite rutas inesperadas', async () => {
  await assert.rejects(buildSite({ phone: undefined }));
  await assert.rejects(buildSite({ phone: '15555550123', basePath: '/../../' }));
});
