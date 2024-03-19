const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get someones avatar')
        .addUserOption((option) =>
            option.setName('user')
                .setDescription('The user you want the avatar to')
            .setRequired(true)
                ),
    async execute(interaction)
    {
        let user = interaction.options.getUser("user");
        let userAvatar = user.displayAvatarURL({size: 4096, dynamic: true});
        if (!interaction.guild) {colour = '#000000'} else {colour = interaction.guild.members.me.displayColor}
        
        const embed = new EmbedBuilder()
        .setTitle(user.username)
        .setURL(user.avatarURL())
        .setColor(colour)
        .setImage(userAvatar)
        .setTimestamp()
        interaction.reply({embeds: [embed]});
    },
}