import { SlashCommandBuilder } from 'discord.js';
import WolframAlphaAPI from 'wolfram-alpha-node';
import { getRequired } from '../../config';

const wolframAPI = getRequired('WOLFRAM_API');
const waApi = WolframAlphaAPI(wolframAPI);

let slashCommand = new SlashCommandBuilder()
.setName('ask')
.setDescription('Ask any question and i might be able to answer it')
.addStringOption((option) =>
    option.setName('question')
    .setDescription('What is the question you want to ask?')
    .setRequired(true))

    slashCommand["integration_types"] = [0,1];
    slashCommand["contexts"] = [0, 1, 2];

export const data = slashCommand;
export async function execute(interaction) {
    try {
        //console.log(await waApi.getFull(question))
        interaction.reply(`-# Question: ${interaction.options.getString('question')}\n${await waApi.getShort(interaction.options.getString('question'))}`);
    } catch (e) {
        //console.log(e.message)
        interaction.reply('I did not understand what you where trying to say, try asking another question. ' + e.message);
    }
}