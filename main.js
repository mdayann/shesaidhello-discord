const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Pentil', { type: ActivityType.Streaming });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'jokopentil') {
    const pdip = client.emojis.cache.find(emoji => emoji.name === "pdip");
    await interaction.reply(`PENTILLLLL!!! ${pdip} ${pdip} ${pdip} LMAO`)
  }
});

client.login(process.env.TOKEN);