const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows user or server info')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
    /**
     * 
     * @param {Discord.Interaction<Discord.CacheType} interaction 
     */
    async execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setFooter({ text: `requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        if (interaction.options.getSubcommand() === 'user') {
            let user = interaction.options.getUser('target');

            if (user) {
                embed.setDescription(`Username: ${user.username}\nID: ${user.id}`)
                .setThumbnail(user.displayAvatarURL());
                await interaction.reply({ embeds: [embed] });
            } else {
                embed.setDescription(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`)
                .setThumbnail(interaction.user.displayAvatarURL());
                await interaction.reply({ embeds: [embed] });
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            embed.setDescription(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
                .setThumbnail(interaction.guild.iconURL())
            await interaction.reply({ embeds: [embed] });
        }
    },
};