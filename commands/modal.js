const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('Replies with modal'),
    /**
     * 
     * @param {Discord.Interaction<Discord.CacheType} interaction 
     * @param {Discord.Client} client 
     */
    async execute(interaction, c) {
        if (interaction.isCommand()) {
            const modal = new Discord.Modal()
                .setCustomId(`${interaction.commandName}_modal`)
                .setTitle('My Modal')
                .addComponents(
                    new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent().setCustomId("test1").setLabel("Name").setPlaceholder("fill me daddy").setStyle('SHORT')),
                    new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent().setCustomId("test2").setLabel("Pass").setPlaceholder("fill me daddy").setStyle('SHORT'))
                );

            await interaction.showModal(modal);
        } else if (interaction.isModalSubmit()) {
            let name = interaction.fields.getTextInputValue("test1");
            let password = interaction.fields.getTextInputValue("test2");
            await interaction.reply({ content: `Your submission was recieved successfully!\n Name:${name}\nPassword:${password}` });
        };
    },
};