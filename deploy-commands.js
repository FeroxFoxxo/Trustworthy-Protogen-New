import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { getRequired } from './config.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getDir } from './config.js';

const clientId = getRequired('clientId');
const guildId = getRequired('guildId');
const token = getRequired('token');

const commands = [];
const baseDir = getDir(import.meta.url);
const foldersPath = join(baseDir, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const commandModule = await import(pathToFileURL(filePath).href);
		const command = commandModule.default ?? commandModule;
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

console.log(`Setting token to ${token} to deploy commands`);

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();