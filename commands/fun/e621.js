const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const blacklist = ['cub', 'loli', 'scat', 'watersports', 'puke', 'fart'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('e621')
        .setDescription('Grabs a random post off of e621 using the tags you give')
        .addStringOption((option) =>
            option.setName('tags')
                .setDescription('Tags you want to search for. Use a space to separate them')
        ),
    async execute(interaction) {
        axios.get(`https://e621.net/posts.json?tags=${interaction.options.getString('tags')}`, { headers: { 'User-Agent': 'e6-f/1.0' } })
            .then(response => {
                let posts = response.data["posts"];

                posts = posts.filter(post => {
                    for (let tag of post.tags["general"]) {
                        if (blacklist[tag]) return false;
                    }
                    return true;
                });

                const randomPost = posts[Math.round(Math.random() * posts.length)];
                // const randomPost = posts;

                const embed = new EmbedBuilder()
                    .setAuthor({ name: 'e621', url: 'https://e621.net/favicon.ico', iconURL: 'https://e621.net/' })
                    .setTitle('View on e621')
                    .setURL(`https://e621.net/posts/${randomPost.id}`)
                    .setDescription(`Score | ${randomPost.score.total}`)
                    .setColor('#2F64B4')
                    .setImage(randomPost.file.url)
                    .setTimestamp();

                if (!interaction.channel.nsfw) {
                    interaction.reply('This must be used in an NSFW channel');
                } else {
                    interaction.reply({ embeds: [embed] });
                }
            })
            .catch(error => {
                console.error(error);
                interaction.reply('Error fetching data from e621.');
            });
    },
};