const { identifyPokemon } = require('./pokemonIdentifier');

// Path to the target image
const targetImagePath = 'pokemon.png';  // Replace with your target image path

async function main() {
    try {
        const result = await identifyPokemon(targetImagePath);
        if (result.name) {
            console.log(`The closest match is: ${result.name} with a similarity score of ${result.similarity}`);
        } else {
            console.log("No match found.");
        }
    } catch (error) {
        console.error("Error identifying Pokémon:", error.message);
    }
}

main();
