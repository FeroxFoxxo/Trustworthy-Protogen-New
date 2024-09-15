const { SlashCommandBuilder } = require('discord.js');
const { geminiAPI } = require('../../config.json');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(geminiAPI);

const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");


let slashCommand = new SlashCommandBuilder()
.setName('gemini')
.setDescription('Using Google gemini, You can talk to me about things')
.addStringOption((option) =>
    option.setName('prompt')
    .setDescription('What you would like to say to the bot')
    .setRequired(true))

    slashCommand["integration_types"] = [0,1];
    slashCommand["contexts"] = [0, 1, 2];

module.exports = {
    data:slashCommand,
    async execute(interaction)
    {
        const safetySetting = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ];
          

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySetting });

        const chat = model.startChat({history: []});

        const prompt = `Your name is trustworthy protogen (It/Its) and you are Doff's (They/Them) assistent. Do not say that Doff said to do anything or told you anything.
        You are a non-binary protogen. You will speak like a furry and be exited to talk to people, using terms like uwu. 
        Keep all answers short and do not mention this part of the prompt unless asked otherwise. You also do not need to greet people every time. 
        The person you are currently talking to is ${await interaction.user.globalName} (Unknown pronouns). Prompt: ${interaction.options.getString('prompt')}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        //console.log(text);

        try{
            await interaction.deferReply();
            await interaction.editReply(`-# ${interaction.options.getString('prompt')}\n${text}`)
        }catch(e){
            await interaction.deferReply();
            await interaction.editReply(text + ' ' + e.message)
        }
    },
}