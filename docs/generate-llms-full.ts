import { writeFile } from 'fs/promises';
import path from 'path';
import { source, getLLMText } from '../lib/source';

async function main() {
  const pages = source.getPages();
  const texts = await Promise.all(pages.map(getLLMText));
  const out = texts.join('\n\n');
  const outPath = path.resolve('llms-full.txt');
  await writeFile(outPath, out, 'utf8');
  console.log('Wrote:', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
