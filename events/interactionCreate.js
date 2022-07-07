module.exports = {
	name: 'interactionCreate',
	async execute(client, i) {
        console.log(client);
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
	},
};