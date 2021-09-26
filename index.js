const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: Object.keys(Intents.FLAGS), });

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { red } = require('colors');
const { readdirSync } = require('fs');

const config = require('./config.json');

client.login(config.token).catch((err) => console.log(err));

client.commands = new Collection();

const loadCommands = async () => {

    const array = [];

    const dirs = readdirSync('./commands');

    for (const files of dirs) {

        const dir = readdirSync(`./commands/${files}`);

        for (const file of dir) {

            const commands = require(`./commands/${files}/${file}`);

            if (commands.name) {

                client.commands.set(commands.name, commands);
                console.log(`[CMDS]`.red + ` ${commands.name}` + ` chargé.`.green);

                array.push(commands);

                const rest = new REST({ version: '9' }).setToken(config.token);

                try {
                    console.log('Actualisation des commandes.'.green);

                    await rest.put(
                        Routes.applicationGuildCommands("ID BOT", "ID SERVEUR"),
                        { body: array },
                    ).catch(() => console.log('-------------------\nTu dois mettre l\'ID de ton bot et l\'id de ton serveur ligne 43.\n-------------------'.red));

                    console.log('Commande ajouté.'.green);
                } catch (err) {
                    console.log(err);
                };

                client.on('guildCreate', async guild => {

                    guild.commands.set(array);

                });

            } else {
                console.log(`[CMDS]`.red + ` ${file}` + ` il faut exporter le nom de la commande.`.red);
            };

        };

    };

};

loadCommands();

client.on('interactionCreate', async (interaction) => {

    if (interaction.isCommand()) {

        const cmd = client.commands.get(interaction.commandName);

        if (cmd) {

            try {
                if (interaction.commandName == cmd.name) cmd.run(interaction, client);
            } catch {
                console.log(red(`Erreur dans la commande ${cmd.name}.`));
            };

        };

    };

});

client.on('ready', () => {

    console.log('Connecté.'.green);

    client.user.setActivity('Slash commands > all.');

});