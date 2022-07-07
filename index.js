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
	if (i.isCommand()) {
		let command = client.commands.get(i.commandName);
		if (!command) return;
		try {
			await command.execute(i);
		} catch (error) {
			console.error(error);
			await i.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	};
});

client.login(process.env.TOKEN);