const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('die')
        .setDescription('Kills me :('),
    async execute(interaction)
    {
        if (interaction.user.id === '383905255760330763'){
            await interaction.reply('Goodbye :(');
            await process.exit();
        } else {
            interaction.reply('I am too strong for you!');
        }
    },
}