const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! wow'),
		/**
		 * 
		 * @param {Discord.Interaction<Discord.CacheType} interaction 
		 */
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};