const { SlashCommandBuilder } = require('discord.js');
const WolframAlphaAPI = require('wolfram-alpha-node');
const { get } = require('../../config');

const wolframAPI = get('WOLFRAM_API', '');
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

module.exports = {
    data:slashCommand,
    async execute(interaction)
    {
        try{
            //console.log(await waApi.getFull(question))
            interaction.reply(`-# Question: ${interaction.options.getString('question')}\n${await waApi.getShort(interaction.options.getString('question'))}`)
        }catch(e){
            //console.log(e.message)
            interaction.reply('I did not understand what you where trying to say, try asking another question. ' + e.message)
        }
    },
}