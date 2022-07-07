const Discord = require("discord.js");

module.exports = {
	name: 'interactionCreate',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Interaction} i 
     * @returns 
     */
	async execute(client, i) {
		if (i.isCommand() || i.isAutocomplete()) {
            let command = client.commands.get(i.commandName);
            if (!command) return;
            try {
                await command.execute(i, client);
            } catch (error) {
                console.error(error);
                await i.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (i.isModalSubmit()) {
            let commandName = i.customId.split("_")[0]
            let command = client.commands.get(commandName);
            if (!command) return;
            try {
                await command.execute(i, client);
            } catch (error) {
                console.error(error);
                await i.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        };
	},
};