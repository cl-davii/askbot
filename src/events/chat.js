const { Events } = require('discord.js');
const { OpenAI } = require('openai');
const { token } = require('../configs/openai.json');
const { chatChannel } = require('../configs/serverConfig.json');

const openai = new OpenAI({ apiKey: token });
const client = require('../../index');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        if (interaction.author.bot) return;
        if (interaction.channel.id !== chatChannel) return;

        const botStats = [{
            role: 'system',
            content: 'Você é uma aplicação programada para responder qualquer tipo de pergunta feita pelo usuário.'
        }];

        try {
            let previousMessages = await interaction.channel.messages.fetch({ limit: 1 });
            previousMessages.reverse();

            previousMessages.forEach((message) => {
                if (message.author.id !== client.id && message.author.bot) return;
                if (message.author.id !== interaction.author.id) return;

                botStats.push({
                    role: 'user',
                    content: message.content
                });
            });

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                store: false,
                messages: botStats
            });
            if (completion.choices[0].message.content.length < 2000) {
                interaction.reply({ content: completion.choices[0].message.content });
            } else {
                interaction.reply({ content: completion.choices[0].message.content.slice(0, 1996) + '...' });
            }
        } catch (error) {
            console.error('O seguinte erro ocorreu ao tentar gerar o texto:\n', error);
        }
    }
}