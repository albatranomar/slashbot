require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 131071 });

client.once("ready", (client) => {
    console.log(`${client.user.tag} is Ready`);
});

client.login(process.env.TOKEN);