import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const sourceImage = resolve(projectRoot, 'src/assets/headshot.jpeg');
const outputImage = resolve(projectRoot, 'public/og.png');

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_SIZE = 520;
const PHOTO_X = 55;
const PHOTO_Y = (HEIGHT - PHOTO_SIZE) / 2;

const photo = await sharp(sourceImage)
  .extract({ left: 0, top: 80, width: 768, height: 768 })
  .resize(PHOTO_SIZE, PHOTO_SIZE)
  .toBuffer();

const textX = PHOTO_X + PHOTO_SIZE + 60;
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .name { font: 700 68px Helvetica, Arial, sans-serif; fill: #ffffff; }
      .tagline { font: 500 30px Helvetica, Arial, sans-serif; fill: #b3b3b3; }
      .url { font: 500 24px Helvetica, Arial, sans-serif; fill: #66b3ff; }
    </style>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0f1a0f"/>
  <text x="${textX}" y="260" class="name">Connor Hanify</text>
  <text x="${textX}" y="320" class="tagline">Security Engineer</text>
  <text x="${textX}" y="362" class="tagline">Incident Response · Cloud Security</text>
  <text x="${textX}" y="530" class="url">connorhanify.com</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: PHOTO_X, top: Math.round(PHOTO_Y) }])
  .png()
  .toFile(outputImage);

console.log(`Wrote ${outputImage}`);
