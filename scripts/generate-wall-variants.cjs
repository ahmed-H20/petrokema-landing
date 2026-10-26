const sharp = require('sharp');
const path = require('path');

const base = path.join(__dirname, '..', 'media', 'images', 'Massive sunlit interior with royal blue accent wall.png');
const outDir = path.join(__dirname, '..', 'public', 'media', 'images');

const variants = [
  { file: 'hero-wall-purple.png', options: { hue: 60, saturation: 1.1 } },
  { file: 'hero-wall-blue.png', options: {} }, // original
  { file: 'hero-wall-teal.png', options: { hue: 330, saturation: 1.1 } },
  { file: 'hero-wall-green.png', options: { hue: 230, saturation: 1.2 } },
  { file: 'hero-wall-yellow.png', options: { hue: 175, saturation: 1.2 } },
  { file: 'hero-wall-gray.png', options: { saturation: 0.15, brightness: 1.05 } },
];

async function generate() {
  for (const v of variants) {
    const dest = path.join(outDir, v.file);
    if (Object.keys(v.options).length === 0) {
      await sharp(base).toFile(dest);
    } else {
      await sharp(base).modulate(v.options).toFile(dest);
    }
    console.log(`Generated: ${v.file}`);
  }
}

generate().catch(console.error);
