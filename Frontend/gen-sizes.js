// gen-sizes.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/assets/department'); // adjust if your images are elsewhere
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));

const sizes = [
  { suffix: '56', w: 56, h: 56 },
  { suffix: '112', w: 112, h: 112 }, // 2x retina
];

(async () => {
  for (const file of files) {
    const base = file.replace(/\.(webp|png|jpg)$/i, '');
    const infile = path.join(dir, file);
    for (const s of sizes) {
      const outname = `${base}-${s.suffix}.webp`;
      const outfile = path.join(dir, outname);
      // cover to avoid distortion, crop center if needed
      await sharp(infile)
        .resize(s.w, s.h, { fit: 'cover' })
        .toFormat('webp', { quality: 80 })
        .toFile(outfile);
      console.log('generated', outname);
    }
  }
  console.log('done');
})();
