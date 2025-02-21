const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./src/configs/clientConfig.json');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)]
});

const { loadEvents } = require('./src/handlers/eventHandler');
const { loadCommands } = require('./src/handlers/commandHandler');

client.commands = new Collection();

client.login(token).then(() => {
    loadEvents(client);
    loadCommands(client);
});