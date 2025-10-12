const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

let slashCommand = new SlashCommandBuilder()
  .setName("timestamp")
  .setDescription("Creates a unix timestamp to copy and paste")
      .addStringOption((option) =>
        option.setName('date')
            .setDescription('**YYYY-MM-DD** The date of the time you want')
        .setRequired(true))
      
        .addNumberOption((option) => 
            option.setName('hour')
            .setDescription('The hour')
            .setRequired(true))
            
        .addNumberOption((option) =>
            option.setName('minute')
            .setDescription('The minute')
            .setRequired(true))

        .addStringOption((option) =>
            option.setName('type')
            .setDescription('The type of timestamp you would want')
            .setRequired(true)
            .addChoices(
                { name: 'Short time', value: 't' },
                { name: 'Long time', value: 'T' },
                { name: 'Short date', value: 'd' },
                { name: 'Long date', value: 'D' },
                { name: 'Long date, short time', value: 'f' },
                { name: 'Full date, short time', value: 'F' },
                { name: 'Reletive', value: 'R' }
            ));

slashCommand["integration_types"] = [0,1];
slashCommand["contexts"] = [0, 1, 2];


module.exports = {
  data: slashCommand,
  async execute(interaction){
    {
        //var etime = 1750750477
        // Timestamp be like <t:numbers:type> Type can be t (Short time), T (Long time), d (Short date), D (Long date), f (Long date, short time), F (Longer date, short time) and R (Reletive)

        const ctime = new Date(`${interaction.options.getString('date')}T${interaction.options.getNumber('hour').toString().padStart(2, '0')}:${interaction.options.getNumber('minute').toString().padStart(2, '0')}:00Z`);
        var etime = Math.floor(ctime.getTime() / 1000)

        interaction.reply({ content: `<t:${etime}:${interaction.options.getString('type')}>\n\`\`<t:${etime}:${interaction.options.getString('type')}>\`\``, ephemeral: true });
    }
  }
}