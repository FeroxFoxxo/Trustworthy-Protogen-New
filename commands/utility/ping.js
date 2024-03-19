const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Tells you the bot latency'),
    async execute(interaction)
    {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        await interaction.editReply(sent.createdTimestamp - interaction.createdTimestamp + ' ms');
    },
}