//#region Stuff
import { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits } from 'discord.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getDataDir } from '../../config.js';

const BASE_DIR = getDataDir(import.meta.url);
const DATA_DIR = join(BASE_DIR, 'confessions');

const ensureDir = (p) => {
    if (!existsSync(p)) {
        mkdirSync(p, { recursive: true });
    }
};

ensureDir(DATA_DIR);
ensureDir(join(DATA_DIR, 'sfw'));
ensureDir(join(DATA_DIR, 'nsfw'));

const filePath = join(DATA_DIR, 'confesscount.json');

let file;

try {
    const raw = readFileSync(filePath, 'utf-8');
    file = JSON.parse(raw);
    if (typeof file !== 'object' || file === null) throw new Error('Invalid JSON');
    file.sfw = Number.isInteger(file.sfw) ? file.sfw : 1;
    file.nsfw = Number.isInteger(file.nsfw) ? file.nsfw : 1;
} catch (e) {
    file = { sfw: 1, nsfw: 1 };
    try {
        writeFileSync(filePath, JSON.stringify(file, null, 2));
    } catch (_) {}
}

export const data = new SlashCommandBuilder()
    .setName('confess')
    .setDescription('Confess your snins (Snail sins) to one of the channels in the Otter Emporium')

    .addStringOption((option) => option.setName('explicitness')
        .setDescription('Is the material you are sending explicit (NSFW), or SFW?')
        .setRequired(true)
        .addChoices(
            { name: 'SFW', value: 'sfw' },
            { name: 'NSFW', value: 'nsfw' }
        ))
    .addStringOption((option) => option.setName('message')
        .setDescription('The message you want to send'))
    .addAttachmentOption((option) => option.setName('image')
        .setDescription('The image you want to send'))
    .addStringOption((option) => option.setName('imageurl')
        .setDescription(`URL To the image you want to send (If you can't / don't want to upload directly)`));
export
    //#endregion
    async function execute(interaction) {
    let image;
    let channelId;
    let icon;
    let number;
    let colour;

    const imageAttachment = interaction.options.getAttachment('image');
    const imageUrl = interaction.options.getString('imageurl');

    image = imageAttachment ? imageAttachment.url : imageUrl;

    if (interaction.options.getString('explicitness') == 'sfw') {
        channelId = '748949920957988954';
        icon = 'https://cdn.discordapp.com/attachments/818144776758231060/829260257187725342/qraswsrhhhx.png';
        //file.sfw += 1
        number = file.sfw;
    } else {
        channelId = '818153913923797012';
        icon = 'https://cdn.discordapp.com/attachments/818144776758231060/829260938296557608/c8246f876f59eeaccad86a40948d9942.png';
        //file.nsfw += 1
        number = file.nsfw;
    }

    if (!interaction.guild) { colour = '#ff00e6'; } else { colour = interaction.guild.members.me.displayColor; }
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Anonymous Confession #${number}`, iconURL: icon })
        .setColor(colour)
        .setImage(image)
        .setDescription(interaction.options.getString('message'))
        .setFooter({ text: 'Use /confess in my DMs to post your own' })
        .setTimestamp();
    //interaction.reply({embeds: [embed]});
    if (interaction.guild) {
        await interaction.reply({ content: 'You must be in a DM channel to use this!', ephemeral: true });

    } else {
        if (!image && !interaction.options.getString('message')) {
            interaction.reply('You cannot send a blank message!');
        } else {
            const confessionNumber = number;
            const userFilePath = join(DATA_DIR, interaction.options.getString('explicitness'), `${confessionNumber}.txt`);
            writeFileSync(userFilePath, interaction.user.id, 'utf-8');

            //let server = await interaction.client.guilds.fetch('441110395999223810');
            //let channel = await (server.channels.get(channelId));
            //console.log(client);
            //if (channel) channel.send();
            await interaction.client.guilds.cache.get('441110395999223810').channels.cache.get(channelId)?.send({ embeds: [embed] });
            await interaction.reply(`Confession sent as ${interaction.options.getString('explicitness')} #${confessionNumber}`);
            if (interaction.options.getString("explicitness") === "nsfw") {
                file.nsfw += 1;
            } else {
                file.sfw += 1;
            }

            try {
                writeFileSync(filePath, JSON.stringify(file, null, 2));
            } catch (err) {
                console.log(err);
            }
        }
    }
}