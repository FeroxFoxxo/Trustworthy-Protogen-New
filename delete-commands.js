import { REST, Routes } from 'discord.js';
import { getRequired } from './config';

const clientId = getRequired('CLIENT_ID');
const token = getRequired('TOKEN');

import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const commands = [];
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

console.log(`Setting token to ${token} to delete commands`);

const rest = new REST().setToken(token);

rest.delete(Routes.applicationCommand(clientId, '1260558666663329832')) //Remember to add command id here
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);