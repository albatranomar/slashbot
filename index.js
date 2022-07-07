require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 131071 });
const fs = require('node:fs');
const path = require('node:path');

client.commands = new Discord.Collection();

client.once("ready", (client) => {
	console.log(`${client.user.tag} is Ready`);
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
});

client.on('interactionCreate', async i => {
	if (i.isCommand() && client.commands.has(i.commandName)) {
		client.commands.get(i.commandName).execute(i);
	};
});

client.login(process.env.TOKEN);