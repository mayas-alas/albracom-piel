import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function buildSite({ phone, basePath = '/', output = 'dist' }) {
  if (typeof phone !== 'string' || !/^[1-9]\d{7,14}$/.test(phone)) {
    throw new Error('Configura WHATSAPP_PHONE con el código de país, sin + ni espacios.');
  }
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(basePath)) throw new Error('SITE_BASE_PATH inválido.');
  const destination = resolve(output);
  const source = resolve('public');
  if (destination === source || source.startsWith(`${destination}/`)) throw new Error('Destino inválido.');
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true });
  for (const filename of ['index.html', '404.html']) {
    const file = resolve(destination, filename);
    let html = await readFile(file, 'utf8');
    html = html.replaceAll('__WHATSAPP_PHONE__', phone);
    html = html.replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}`);
    await writeFile(file, html);
  }
  await writeFile(resolve(destination, 'config.js'), `// Generado al publicar. No editar ni guardar en Git.\nexport const PHONE = ${JSON.stringify(phone)};\n`);
  await writeFile(resolve(destination, '.nojekyll'), '');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await buildSite({ phone: process.env.WHATSAPP_PHONE, basePath: process.env.SITE_BASE_PATH || '/', output: process.env.SITE_OUTPUT || 'dist' });
    console.log('Landing lista para publicar.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
