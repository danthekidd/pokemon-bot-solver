const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pixelmatch = require('pixelmatch');

const pokemonDir = path.join(__dirname, 'pokemon');

async function loadAndResizeImage(imagePath) {
    try {
        const image = await sharp(imagePath).resize(70, 70).raw().toBuffer();
        return { data: image, width: 70, height: 70 };
    } catch (error) {
        console.error(`Error loading image ${imagePath}:`, error.message);
        return null;
    }
}

function calculateSimilarity(imageData1, imageData2, width, height) {
    const diffPixels = pixelmatch(imageData1, imageData2, null, width, height, { threshold: 0.1 });
    return 1 - diffPixels / (width * height);
}

function getNameWithoutSuffix(filename) {
    return filename.replace(/_[^_]+\.png$/, '');
}

async function identifyPokemon(targetImagePath) {
    const targetImage = await loadAndResizeImage(targetImagePath);
    if (!targetImage) {
        throw new Error("Failed to load the target image.");
    }

    let closestMatch = { name: null, similarity: 0 };

    const files = fs.readdirSync(pokemonDir).filter(file => file.endsWith(".png"));

    await Promise.all(files.map(async (filename) => {
        const imgPath = path.join(pokemonDir, filename);
        const pokemonImage = await loadAndResizeImage(imgPath);

        if (pokemonImage) {
            const similarity = calculateSimilarity(targetImage.data, pokemonImage.data, targetImage.width, targetImage.height);

            if (similarity > closestMatch.similarity) {
                closestMatch = { name: getNameWithoutSuffix(filename), similarity };
            }
        } else {
            console.warn(`Skipping unreadable image: ${filename}`);
        }
    }));

    return closestMatch;
}

module.exports = { identifyPokemon };
