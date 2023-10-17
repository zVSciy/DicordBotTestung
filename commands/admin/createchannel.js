// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('createchannel')
//         .setDescription('creates a channel')
//         .addChannelOption(option => option
//             .setName('channelname')
//             .setRequired(true),
//         ),
//     async execute(interaction) {
//         const channel = interaction.option.getChannel('channel');

//         try {
//             await interaction.create.channel(channel.name);
//         } catch (error) {
//             console.error(error);
//         }

//     },
// };

const {SlashCommandBuilder, PermissionFlagsBits, ChannelType, GuildCategory} = require ('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-channel')
    .setDescription('Create a custom channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption(option =>
    option.setName('channeltype')
    .setRequired(true)
    .setDescription('Set the type of the channel')
    .addChoices(
        { name: 'Text channel', value: 'textchannel'},
        { name: 'Voice channel', value: 'voicechannel'},
    ),
    )
    .addStringOption(option =>
    option.setName('channelname')
    .setDescription('Set the name of the channel')
    .setRequired(true),
    )
    .addChannelOption(option =>
    option.setName('parent')
    .setDescription('Set the parent of the channel.')
    .setRequired(true)
    .addChannelTypes(ChannelType.GuildCategory),
    )
    .addRoleOption(option =>
    option.setName('permission-role')
    .setDescription('The permission role for the server')
    .setRequired(true),
    )
    .addRoleOption(option =>
    option.setName('everyone')
    .setDescription('@everyone')
    .setRequired(true),
    ),
    async execute(interaction) {
        const {guild, member, options } = interaction;

        const {Viewchannel, ReadMessageHistory, SendMessages, Connect, Speak } = PermissionFlagsBits;

        const channeltype = options.getString('channeltype');
        const channelname = options.getString('channelname');
        const parent = options.getChannel('parent');
        const permissions = options.getRole('permission-role');
        const everyone = options.getRole('everyone');

        if (channeltype === 'textchannel') {
            await guild.channels.create({
                name: `${channelname}`,
                type: ChannelType.GuildText,
                parent: parent,

                permissionsOverwrites: [
                    {
                        id: permissions,
                        allow: [Viewchannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: everyone,
                        deny: [Viewchannel, SendMessages, ReadMessageHistory],
                    },
                ],
            });
        }

        if (channeltype === 'voicechannel') {
            await guild.channels.create({
                name: `${channelname}`,
                type: ChannelType.GuildVoice,
                parent: parent,

                permissionsOverwrites: [
                    {
                        id: permissions,
                        allow: [Viewchannel, Connect, Speak],
                    },
                    {
                        id: everyone,
                        deny: [Viewchannel, Connect, Speak],
                    },
                ],
            });
        }

            await interaction.reply({content: 'The channel was successfully created.', ephemeral: true });

    },
};
