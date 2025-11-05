 // scripts/generate-dept-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'src', 'assets', 'department'); // adjust if your originals are here
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'department'); // generated files go here

if (!fs.existsSync(inputDir)) {
  console.error('Input folder not found:', inputDir);
  process.exit(1);
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [
  { suffix: '-56', size: 56 },
  { suffix: '-112', size: 112 },
];

(async () => {
  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const ext = path.extname(file);
    const name = path.basename(file, ext).replace(/\s+/g, '-');

    for (const s of sizes) {
      const outName = `${name}${s.suffix}.webp`;
      const outPath = path.join(outputDir, outName);
      try {
        await sharp(inputPath)
          .resize(s.size, s.size, { fit: 'cover' })
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log('Generated:', outPath);
      } catch (err) {
        console.error('Error processing', inputPath, err);
      }
    }
  }
  console.log('All done.');
})();
