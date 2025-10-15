import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { getRequired } from './config';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const clientId = getRequired('CLIENT_ID');
const token = getRequired('TOKEN');

const commands = [];
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			if (command.data instanceof SlashCommandBuilder){
				commands.push(command.data.toJSON());
			} else {
				commands.push(command.data);
			}
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

console.log(`Setting token to ${token} to deploy all commands`);

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();