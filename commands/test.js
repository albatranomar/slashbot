const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing some shit')
        .addSubcommand(subcommand =>
            subcommand
                .setName('buttons')
                .setDescription('testing some shit')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('menus')
                .setDescription('testing some shit')),
    /**
     * 
     * @param {Discord.Interaction<Discord.CacheType} interaction 
     */
    async execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setFooter({ text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        if (interaction.options.getSubcommand() === 'buttons') {
            embed.setDescription(`Testing buttons`);

            let row = new Discord.MessageActionRow()
                .setComponents([
                    new Discord.MessageButton().setStyle('PRIMARY').setCustomId(`test`).setLabel(`test 1`),
                    new Discord.MessageButton().setStyle('PRIMARY').setCustomId(`test2`).setLabel(`test 2`)
                ])

            interaction.reply({
                embeds: [embed],
                components: [row]
            })

            let filter = i => i.user.id === interaction.user.id;

            let collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                await i.update({ content: `A button(${i.customId}) was clicked!` });
            });

            collector.on('end', collected => console.log(`Collected ${collected.size} items`));

        } else if (interaction.options.getSubcommand() === 'menus') {
            let row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId("select")
                        .setPlaceholder("Plaese shit your self")
                        .addOptions([...interaction.guild.roles.cache.map(r => {
                            return {
                                label: r.name,
                                description: `members ${r.members.size}`,
                                value: r.id,
                            }
                        })])
                );

            await interaction.reply({ components: [row] });

            let collector = interaction.channel.createMessageComponentCollector({
                filter: i => i.user.id = interaction.user.id,
                time: 15000
            });

            collector.on("collect", i => {
                console.log(i);
            })
                .on("end", i => {
                    console.log(`Collected ${i.size}`);
                });

        }
    },
};