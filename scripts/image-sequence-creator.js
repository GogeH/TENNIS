/* eslint-disable */
const fs = require('fs');

const imageDirectory = "./src/assets/img/brainImages";
const exportFile = "./src/assets/img/brainImages/index.ts";
const imageSequenceDirectory = "./src/components/Sequence/imageArray.ts"

async function main() {
  createImageImports();
  setTimeout(() => {
    createImageExports();
  }, 100);
  createImageSequence();
}

main();

function createImageImports() {
  fs.readdir(imageDirectory, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }
    let currentIndex = 0;
    const stream = fs.createWriteStream(exportFile);
    stream.write(`/* eslint-disable camelcase */\n`)
    files.forEach(function (file) {
      if (file.includes('.webp')) {
        stream.write(`import brain_${currentIndex} from './${file}';\n`)
        console.log(`import for ${file} created`);
        currentIndex++;
      }
    });
    stream.write(`\n`)
  });
}

function createImageExports() {
  fs.readdir(imageDirectory, function (err, files) {
    const stream = fs.createWriteStream(exportFile, { flags: 'a' });
    let currentIndex = 0;
    stream.write(`export const brainImages = Array.of(\n`);
    files.forEach(function (file) {
      if (file.includes('.webp')) {
        stream.write(`  brain_${currentIndex},\n`)
        currentIndex++;
      }
    })
    stream.write(');\n');
    
    stream.end();
  });
}

function createImageSequence() {
  fs.readdir(imageDirectory, function (err, files) {
    const stream = fs.createWriteStream(imageSequenceDirectory);
    let currentIndex = 0;
    stream.write(`import { brainImages } from 'assets/img/brainImages';\n`);
    stream.write(`import { useImage } from 'hooks';\n\n`);

    stream.write(`export const BrainImagesArray = () => {\n`);
    files.forEach(function (file) {
      if (file.includes('.webp')) {
        stream.write(`  const [Image${currentIndex}, Image${currentIndex}S] = useImage(brainImages[${currentIndex}]);\n`)
        currentIndex++;
      }
    })
    currentIndex = 0
    stream.write(`\n\n  const newImages = Array.of(`);
    files.forEach(function (file) {
      if (file.includes('.webp')) {
        stream.write(`\n    [Image${currentIndex}, Image${currentIndex}S],`)
        currentIndex++;
      }
    })
    stream.write('  );\n');
    stream.write('  return newImages;\n');

    stream.write('  };\n');

    stream.write('export default BrainImagesArray;\n');
    
    stream.end();
  });
}