const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


const rest = new REST().setToken(token);

rest.delete(Routes.applicationGuildCommand(clientId, '441110395999223810', '1178984722064494624'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);