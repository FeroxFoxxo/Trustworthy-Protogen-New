import { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } from 'discord.js';

const interaction = new ContextMenuCommandBuilder()
    .setName("Get Avatar")
    .setType(ApplicationCommandType.User);      

interaction["integration_types"] = [0,1];
interaction["contexts"] = [0, 1, 2];

function thing(interaction){
    user = interaction.targetUser;
    let userAvatar = user.displayAvatarURL({size: 4096, dynamic: true});
    if (!interaction.guild) {colour = '#1B0252'} else {colour = interaction.guild.members.me.displayColor}
    //console.log(user.id)

    const embed = new EmbedBuilder()
    .setAuthor({name: user.username, url: user.avatarURL()})
    //.setTitle(user.username)
    .setURL(user.avatarURL())
    .setColor(colour)
    .setImage(userAvatar)
    .setTimestamp()
    interaction.reply({embeds: [embed]});
}

export const data = interaction;
export const execute = thing;