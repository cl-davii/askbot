const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Retorna a latência para resposta do bot'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pingando...' });

        const embed = new EmbedBuilder()
            .setTitle('Latência')
            .setDescription(`Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)
            .setColor('#0099ff')
            .setTimestamp();

        await interaction.editReply({
            embeds: [embed],
            ephemeral: true
        });
    },
}