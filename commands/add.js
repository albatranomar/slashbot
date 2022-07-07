const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('add numbers togther')
        .addNumberOption(option =>
            option.setName("firstnumber").setDescription("firstnumber")
            .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName("secoundnumber").setDescription("secoundnumber")
            .setRequired(true)
        ),
    /**
     * 
     * @param {Discord.Interaction<Discord.CacheType} interaction 
     * @param {Discord.Client} client 
     */
    async execute(interaction, client) {
        let sum = interaction.options.getNumber("firstnumber") + interaction.options.getNumber("secoundnumber")
        await interaction.reply({
            content: `the answer is : ${sum}`,
            ephemeral: true
        });
    },
};