const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

let slashCommand = new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get someones avatar')
    .addUserOption((option) =>
        option.setName('user')
            .setDescription('The user you want the avatar of')
        .setRequired(true)
    );        

slashCommand["integration_types"] = [0,1];
slashCommand["contexts"] = [0, 1, 2];

module.exports = {
    data: slashCommand,
    async execute(interaction)
    {
        let user = await interaction.options.getUser("user").fetch();
        let userAvatar = user.displayAvatarURL({size: 4096, dynamic: true});
        if (!interaction.guild) {colour = '#1B0252'} else {colour = interaction.guild.members.me.displayColor}
        
        const embed = new EmbedBuilder()
        .setAuthor({name: user.username, url: user.avatarURL()})
        //.setTitle(user.username)
        .setURL(user.avatarURL())
        .setColor(colour)
        .setImage(userAvatar)
        .setTimestamp()
        interaction.reply({embeds: [embed]});
    },
}