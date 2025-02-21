const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./src/configs/clientConfig.json');
const { serverId } = require('./src/configs/serverConfig.json');

const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    console.log(command);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[ALERTA] O comando em ${filePath} está faltando a propriedade "data" ou "execute".`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    let updatingMessage;
	try {
        if (commands.length === 1) {
            updatingMessage = `Atualizando 1 comando(/) da aplicação...`;
        } else {
            updatingMessage = `Atualizando ${commands.length} comandos(/) da aplicação...`;
        }
		console.log(updatingMessage);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, serverId),
			{ body: commands },
		);
        let updatedMessage;
        if (data.length === 1) {
            updatedMessage = `O comando(/) foi atualizado`;
        } else {
            updatedMessage = `Os ${data.length} comandos(/) da aplicação foram atualizados.`;
        }
		console.log(updatedMessage);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();