const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


const rest = new REST().setToken(token);

rest.delete(Routes.applicationCommand(clientId, '1260558666663329832')) //Remember to add command id here
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);