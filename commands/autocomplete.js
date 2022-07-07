const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autocomplete')
        .setDescription('Test command to show how autocomplete should be set up')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Name of something')
                .setAutocomplete(true)),
    /**
     * 
     * @param {Discord.Interaction<Discord.CacheType} interaction 
     * @param {Discord.Client} client 
     */
    async execute(interaction, c) {
        if (interaction.isAutocomplete()) {
            const focusedValue = interaction.options.getFocused();
            const choices = ['faq', 'install', 'collection', 'promise', 'debug', "ياسر الدوسري"];
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        } else if (interaction.isCommand()) {
            interaction.reply(`${interaction.options.getString("name")}`);
        }
    },
};