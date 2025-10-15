import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('die')
    .setDescription('Kills me :(');
export async function execute(interaction) {
    if (interaction.user.id === '383905255760330763') {
        await interaction.reply('Goodbye :(');
        await process.exit();
    } else {
        interaction.reply('I am too strong for you!');
    }
}