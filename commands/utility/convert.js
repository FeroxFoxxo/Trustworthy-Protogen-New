const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Message, Client, ActionRow, ComponentType } = require('discord.js');

const interaction = new ContextMenuCommandBuilder()
    .setName("Convert")
    .setType(ApplicationCommandType.Message);

interaction["integration_types"] = [0,1];
interaction["contexts"] = [0, 1, 2];

async function thing(interaction){
    const select = new StringSelectMenuBuilder()
			.setCustomId('conversion')
			.setPlaceholder('Select conversion type')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('°F -> °C')
					.setDescription('Converts from Fahrenheit to Celsius')
					.setEmoji('🌡️')
					.setValue('f-c'),
				new StringSelectMenuOptionBuilder()
					.setLabel('°C -> °F')
					.setDescription('Converts from Celsius to Fahrenheit')
					.setEmoji('🌡️')
					.setValue('c-f'),
				new StringSelectMenuOptionBuilder()
					.setLabel('I -> Cm')
					.setDescription('Converts from Inch to Centemeter')
					.setEmoji('📏')
					.setValue('i-cm'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Cm -> I')
					.setDescription('Converts from Centemeter to Inch')
					.setEmoji('📏')
					.setValue('cm-i'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Mi -> Km')
					.setDescription('Converts from Miles to Kilometers')
					.setEmoji('📏')
					.setValue('m-km'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Km -> Mi')
					.setDescription('Converts from Kilomitres to Miles')
					.setEmoji('📏')
					.setValue('km-m'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Foot -> M')
					.setDescription('Converts from Feet to Meters')
					.setEmoji('📏')
					.setValue('f-m'),
				new StringSelectMenuOptionBuilder()
					.setLabel('M -> Foot')
					.setDescription('Converts from Meters to Feet')
					.setEmoji('📏')
					.setValue('m-f'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Lbs -> Kg')
					.setDescription('Converts from Pounds to Kilograms')
					.setEmoji('🪨')
					.setValue('p-k'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Kg -> Lbs')
					.setDescription('Converts from Kilograms to Pounds')
					.setEmoji('🪨')
					.setValue('k-p'),
			);

    const dropdown = new ActionRowBuilder()
	.addComponents(select);

	var message = interaction.targetMessage.content

//#region Conversions
	var FtoC = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round((parseInt(match) -32) / 1.8 * 100) / 100; //f to c
	});
	var CtoF = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) * 1.8 + 32 * 100) / 100; //c to f
	});
	var ItoCm = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) * 2.54 * 100) / 100; //Cm to Inch
	});
	var CmtoI = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) / 2.54 * 100) / 100; //Inch to Cm
	});
	var MtoKm = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) * 1.609344 * 100) / 100; //Miles to KM
	});
	var KmtoM = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) / 1.609344 * 100) / 100; //KM to Miles
	});
	var FtoM = message.replace(/(\d+)'(\d+)?"?/g, (match, feet, inches = 0) => { //Feet to Meters
		return Math.round(((parseInt(feet) * 30.48 + parseInt(inches) * 2.54) / 100) * 100) / 100;
	});
	var MtoF = message.replace(/\d+(\.\d+)?/g, (match) => {
		let totalInches = parseFloat(match) * 39.3701; // Meters to Feet
		let feet = Math.floor(totalInches / 12);
		let inches = Math.round(totalInches % 12);
		return `${feet}'${inches}"`;
	});
	var PtoK = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) * 0.45359237 * 100) / 100; //Pounds to KG
	});
	var KtoP = message.replace(/\d+(\.\d+)?/g, (match) => {
		return Math.round(parseInt(match) / 0.45359237 * 100) / 100; //KG to Pounds
	});
	
	
//#endregion

	const selection = await interaction.reply({
		//content: 'Test',
		components: [dropdown],
		ephemeral: true
	})

	const collector = selection.createMessageComponentCollector({
		ComponentType: ComponentType.StringSelect,
		time: 60000,
	})

	collector.on('collect', (interaction) =>{
		//console.log(interaction.values);
		//interaction.update({ content: 'Awooga', components: []})
		if(interaction.values == 'c-f'){
			interaction.update({ content: CtoF, components: []})
		} else if(interaction.values == 'f-c'){
			interaction.update({ content: FtoC, components: []})
		} else if(interaction.values == 'i-cm'){
			interaction.update({ content: ItoCm, components: []})
		} else if(interaction.values == 'cm-i'){
			interaction.update({ content: CmtoI, components: []})
		} else if(interaction.values == 'm-km'){
			interaction.update({ content: MtoKm, components: []})
		} else if(interaction.values == 'km-m'){
			interaction.update({ content: KmtoM, components: []})
		} else if(interaction.values == 'm-f'){
			interaction.update({ content: MtoF, components: []})
		} else if(interaction.values == 'f-m'){
			interaction.update({ content: FtoM, components: []})
		} else if(interaction.values == 'p-k'){
			interaction.update({ content: PtoK, components: []})
		} else if(interaction.values == 'k-p'){
			interaction.update({ content: KtoP, components: []})
		}
	});

}

module.exports = {
    data: interaction,
    execute: thing
}