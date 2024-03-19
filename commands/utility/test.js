const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Command to test things with'),
    async execute(interaction)
    {
        if (!interaction.guild) {colour = '#000000'} else {colour = interaction.guild.members.me.displayColor}
        const embed = new EmbedBuilder()
        .setTitle('OwO')
        .setURL('https://dingledangledoff.gay/')
        .setColor(colour)
        .setImage('https://dingledangledoff.gay/SpaceDoff.png')
        .setTimestamp()
        interaction.reply({embeds: [embed]});
    },
}