const { SlashCommandBuilder } = require('discord.js');
const WolframAlphaAPI = require('wolfram-alpha-node');
const waApi = WolframAlphaAPI("YWPXT6-RGLG5G5LH6");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask any question and i might be able to answer it')
        .addStringOption((option) =>
            option.setName('question')
            .setDescription('What is the question you want to ask?')
            .setRequired(true)
            ),
    async execute(interaction)
    {
        try{
            //console.log(await waApi.getFull(question))
            interaction.reply(`"${interaction.options.getString('question')}"\n${await waApi.getShort(interaction.options.getString('question'))}`)
        }catch(e){
            //console.log(e.message)
            interaction.reply('I did not understand what you where trying to say, try asking another question. ' + e.message)
        }
    },
}