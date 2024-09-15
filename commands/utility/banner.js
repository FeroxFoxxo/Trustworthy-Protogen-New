const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

let slashCommand = new SlashCommandBuilder()
    .setName('banner')
    .setDescription('Get someones banner')
    .addUserOption((option) =>
        option.setName('user')
            .setDescription('The user you want the banner of')
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
        if (!user.accentColor) {colour = '#1B0252'} else {colour = user.accentColor}
        if (!user.accentColor) {footerText = 'This user does not have an accent colour'} else {footerText = `Accent colour is #${user.accentColor}`}

        if(user.banner) {
                const extension = user.banner.startsWith("a_") ? '.gif' : '.png';
                bannerURL = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}${extension}?size=4096`
                idk = '';
            } else {
                bannerURL = 'https://dingledangledoff.gay/DoffGoDoot.png'
                idk = 'This user does not have a banner.'
            }
        
        const embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: userAvatar, url: user.avatarURL()})
        .setURL(bannerURL)
        .setColor(colour)
        .setImage(bannerURL)
        .setTimestamp()
        .setFooter({text: footerText+'. '+idk})
        interaction.reply({embeds: [embed]});

        //console.log(user)
    },
}