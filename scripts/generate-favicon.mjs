import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicDir = resolve(projectRoot, 'public');

const BG = '#0f1a0f';
const FG = '#ffffff';
const MONOGRAM = 'ch';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${BG}"/>
  <text x="32" y="45" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="38" fill="${FG}">${MONOGRAM}</text>
</svg>
`;

await writeFile(resolve(publicDir, 'favicon.svg'), svg);

await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png'));
await sharp(Buffer.from(svg)).resize(32, 32).png().toFile(resolve(publicDir, 'favicon-32.png'));

console.log('Wrote favicon.svg, apple-touch-icon.png, favicon-32.png');
