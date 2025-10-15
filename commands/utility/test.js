import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

let slashCommand = new SlashCommandBuilder()
  .setName("test")
  .setDescription("Command to test things with");

slashCommand["integration_types"] = [0,1];
slashCommand["contexts"] = [0, 1, 2];

//console.log(slashCommand)

export const data = slashCommand;
export async function execute(interaction) {
  {
    /*if (!interaction.guild) {colour = '#1B0252'} else {colour = interaction.guild.members.me.displayColor}
    const embed = new EmbedBuilder()
    .setTitle('OwO')
    .setURL('https://dingledangledoff.gay/')
    .setColor(colour)
    .setImage('https://dingledangledoff.gay/SpaceDoff.png')
    .setTimestamp()
    interaction.reply({embeds: [embed]});*/
    //const { username } = interaction.user.id;
    interaction.reply({ content: 'Awooga ' });
    console.log(await interaction.user.globalName);
  }
}