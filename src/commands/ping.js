const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Retorna a latência entre cliente e o servidor.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', flags: 64 });  // Use flags instead of ephemeral
        interaction.editReply({ content: `Latência: ${sent.createdTimestamp - interaction.createdTimestamp}ms` });
    }
}
