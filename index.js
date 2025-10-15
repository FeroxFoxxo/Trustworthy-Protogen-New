import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, Events, GatewayIntentBits, ActivityType } from 'discord.js';
import { getArray, getRequired } from './config';

const token = getRequired('TOKEN');
const blockedUsers = getArray('BLOCKED_USERS', []);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
export default client;

client.commands = new Collection();

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	//if (!interaction.isChatInputCommand()) return;
	if (blockedUsers.includes(interaction.user.id)) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Bot is online ${readyClient.user.tag}`);
});

client.on("ready", () => {
    client.user.setActivity({
        type: ActivityType.Custom,
        name: 'status',
        state: "Getting worked on so if I don't respond, just try again later"
    })
});

console.log(`Logging in with token ${token}`);

client.login(token);

//Pretty much all of this is just the stuff from the discord.js docs