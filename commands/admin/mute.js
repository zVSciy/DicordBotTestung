const {SlashCommandBuilder} = require('@discordjs/builders');
const dataBaseAccess = require('../../databaseAccess.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('mutes / unmutes a user.')
        .addUserOption(option => option
        .setName('user')
        .setDescription('The user to mute / umnute')
        .setRequired(true),
        )
        .addBooleanOption(option => option
        .setName('mute')
        .setDescription('Mute or unmute the user')
        .setRequired(true),
        ),
    async execute(interaction) {
        const guild = interaction.guild;
        const target = interaction.options.getUser('user');
        const member = guild.members.cache.get(interaction.options.getUser('user').id);
        const bool = interaction.options.getBoolean('mute');

        const db = new dataBaseAccess('./db.sqlite3');

        if (bool) {
            db.writeUserToTable('mutedUsers', target.id);
            await member.voice.setMute(true);
        } else {
            db.removeUserFromTable('mutedUsers', target.id);
            await member.voice.setMute(false);
        }
    },
};