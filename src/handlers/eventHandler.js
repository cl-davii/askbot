const fs = require('node:fs');
const path = require('node:path');
const ascii = require('ascii-table');

function loadEvents(client) {
    const table = new ascii().setHeading('events', 'status');

    const eventsPath = path.join(__dirname, '..', 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        table.addRow(file, 'loaded');
    }
    return console.log(table.toString());
}

module.exports = { loadEvents }