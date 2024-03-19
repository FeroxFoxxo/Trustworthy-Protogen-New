const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Gets the weather of wherever you want')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('The location you want the weather from')
                .setRequired(true)),
    async execute(interaction)
    {
        console.log({search: weather.find(interaction.options.getString('location')), degreeType: 'C'})

        /*if (!interaction.guild) {colour = '#000000'} else {colour = interaction.guild.members.me.displayColor}
        const embed = new EmbedBuilder()
        .setTitle('OwO')
        .setURL('https://dingledangledoff.gay/')
        .setColor(colour)
        .setImage('https://dingledangledoff.gay/SpaceDoff.png')
        .setTimestamp()
        interaction.reply({embeds: [embed]});*/
        interaction.reply('Awooga')
    },
}