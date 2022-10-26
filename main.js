require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const log4js = require('log4js');
const discord = require('./discord');

const logger = log4js.getLogger();
logger.level = 'debug';

try {
  app.get('/', (req, res) => {
    res.json({ server_status: 'up' });
  });

  app.listen(port, () => {
    logger.debug(`Server started on port ${port}`);
  });

  discord();
} catch (error) {
  logger.error(`Error Happened : ${error}`);
}
