const { Client } = require('discord.js-selfbot-v13');
const { token, botUserId } = require('./config.json');
const { identifyPokemon } = require('./pokemonIdentifier');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const client = new Client();

client.on('ready', async () => {
  console.log(chalk.green(`${client.user.username} is ready!`));
});

const spawnedPokemon = {}

client.on('messageCreate', async (message) => {
    if (message.author.id === botUserId) {
        const spawnEmbed = message.embeds[0];
        if (spawnEmbed && spawnEmbed.title === 'A wild pokémon has appeared!') {
            console.log(chalk.yellow("Pokémon spawned. Downloading image..."));

            const imageUrl = spawnEmbed.image?.url;

            if (imageUrl) {
                const response = await fetch(imageUrl);
                const buffer = await response.buffer();

                const filePath = path.join(__dirname, 'pokemon.png');
                fs.writeFile(filePath, buffer, async (err) => {
                    if (err) {
                        console.error(chalk.red('Error saving image:'), err);
                    } else {
                        console.log(chalk.blue("Downloaded image. Identifying pokémon..."));
                        try {
                            const result = await identifyPokemon('pokemon.png');
                            if (result.name) {
                                console.log(chalk.green(`Identified pokémon as ${result.name} with a similarity score of ${result.similarity}.`));

                                spawnedPokemon[message.channel.id] = result.name

                                // await message.reply({
                                //     content: result.name,
                                //     allowedMentions: { repliedUser: false }
                                // });
                            } else {
                                await message.reply({
                                    content: "No match found.",
                                    allowedMentions: { repliedUser: false }
                                });
                            }
                        } catch (error) {
                            console.error(chalk.red("Error identifying Pokémon:"), error.message);
                        }
                    }
                });
            }
        }
    } else if (message.author.id === client.user.id) {
        if (spawnedPokemon[message.channel.id]) {
            const pokemon = spawnedPokemon[message.channel.id];
            switch (message.content) {
                case 'xcatch':
                    message.delete();
                    message.channel.send(`p!catch ${pokemon}`);
                    delete spawnedPokemon[message.channel.id];
                    break;
                case 'xduel':
                    message.delete();
                    message.channel.send(`p!spawnduel ${pokemon}`);
                    delete spawnedPokemon[message.channel.id];
                    break;
                case 'xname':
                    message.delete();
                    message.channel.send(pokemon);
                    break;
            }
        }
    }
});

client.login(token);
