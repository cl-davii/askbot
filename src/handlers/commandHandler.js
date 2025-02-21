const fs = require('node:fs');
const path = require('node:path');
const ascii = require('ascii-table');

function loadCommands(client) {
    const table = new ascii().setHeading('commands', 'status');

    let commandsArray = []

    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
        table.addRow(file, 'loaded');
    }
    client.application.commands.set(commandsArray);
    return console.log(table.toString());
}

module.exports = { loadCommands }