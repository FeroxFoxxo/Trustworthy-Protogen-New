import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Tells you the bot latency');
export async function execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    await interaction.editReply(sent.createdTimestamp - interaction.createdTimestamp + ' ms');
}