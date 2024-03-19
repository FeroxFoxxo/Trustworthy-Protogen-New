const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Secretly say something as me!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The secret message you want to send')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel you want to send the message in')
                .addChannelTypes(ChannelType.GuildText)),
    async execute(interaction)
    {
        if(!interaction.options.getChannel('channel')){
            await interaction.channel.send(interaction.options.getString('message'));
        } else {
            interaction.guild.channels.cache.get(interaction.options.getChannel('channel').id).send(interaction.options.getString('message'));
        }    
        await interaction.reply({ content: 'Message Sent!', ephemeral: true });
        //console.log(interaction.options.getChannel('channel').id)
    },
}