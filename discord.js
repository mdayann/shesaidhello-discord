const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const cron = require('cron');

require('dotenv').config();
const weather = require('./weather');

const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'debug';

function mainDiscord() {
  try {
    client.login(process.env.DISCORD_TOKEN);

    client.on('ready', () => {
      logger.debug(`Logged in as ${client.user.tag}!`);
      client.user.setActivity('Pentil', { type: ActivityType.Streaming });


      let scheduledMessage = new cron.CronJob('0 0 13 * * *', async () => {
           const guild = client.guilds.cache.get('312965119250399234');
           const channel = guild.channels.cache.get('312965119250399234');

           let weatherMessage = await weather()

           channel.send(weatherMessage);
          });

          scheduledMessage.start()

    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'jokopentil') {
        const pdip = client.emojis.cache.find((emoji) => emoji.name === 'pdip');
        await interaction.reply(`Received request : ${pdip}`);
        logger.debug(`Received command request : ${interaction.commandName}`);
      }
    });

  } catch (error) {
    logger.error(`Error Happened : ${error}`);
  }
}

module.exports = mainDiscord;