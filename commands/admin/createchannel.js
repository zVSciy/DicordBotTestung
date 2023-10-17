const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createchannel')
        .setDescription('creates a channel')
        .addChannelOption(option => option
        .setName('channelname')
        .setRequired(true),
        ),
    async execute(interaction) {
        const channel = interaction.option.getChannel('channel');

        try {
            await interaction.create.channel(channel.name);
        } catch (error) {
            console.error(error);
        }

    },
};