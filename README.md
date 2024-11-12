# Pokémon Bot Solver

`pokemon-bot-solver` is a Discord selfbot designed to identify and respond to Pokémon spawned by the [Pokémon Bot](https://pokemonbot.com/). The selfbot can recognize the Pokémon and execute various commands such as catching, dueling, and naming them.

## Features

- **Automatic Pokémon Recognition**: The selfbot can identify spawned Pokémon from the Pokémon Bot and provide their names.
- **Auto Catch**: Catches the spawned Pokémon using the `xcatch` command.
- **Duel Initiation**: Quickly initiates a duel against the spawned Pokémon using the `xduel` command.
- **Naming Pokémon**: Names the caught Pokémon using the `xname` command.

## Requirements

- Node.js (v20.15.1 or higher)
- Discord account token

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/danthekidd/pokemon-bot-solver.git
   cd pokemon-bot-solver
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup configuration**:
   - Edit the `config.json` file in the root directory and add your Discord token:
     ```
     "token": "your_discord_token_here"
     ```
4. **Run the bot**:
   ```bash
   node .
   ```

## Usage

Once the selfbot is running, it will listen for Pokémon spawns in any server you are part of and you may perform the following actions:

- **Catching Pokémon**:
  - When a Pokémon spawns, the bot automatically identifies its name and you can use the `xcatch` command to catch it.
  - Example:
    ```
    xcatch
    ```

- **Dueling Pokémon**:
  - If you want to duel the spawned Pokémon, the bot can initiate a duel using the `xduel` command.
  - Example:
    ```
    xduel
    ```

- **Naming Pokémon**:
  - After a Pokémon spawns, the bot can send the name it of the Pokémon using the `xname` command.
  - Example:
    ```
    xname
    ```

## Disclaimer
- This project is a **selfbot** and may violate Discord's Terms of Service. Use it at your own risk.
- This bot is intended for **educational purposes**. I do not condone cheating or spamming on Discord servers.

## License

This project is licensed under the [MIT License](LICENSE).
