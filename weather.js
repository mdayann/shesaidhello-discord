require('dotenv').config();
const fetch = require('node-fetch');

const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'debug';

async function mainWeather() {
  try {
    const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/211671?apikey=${process.env.ACCU_API_KEY}&language=id-id`)
    const json = await response.json()
    if (response.ok) {

        let morningStatus = json[0].IconPhrase
        let eveningStatus = json[6].IconPhrase
        let nightStatus = json[11].IconPhrase

        let morningDegree = parseFloat((json[0].Temperature.Value - 32) / 1.8).toFixed(1)
        let eveningDegree = parseFloat((json[6].Temperature.Value - 32) / 1.8).toFixed(1)
        let nightDegree = parseFloat((json[11].Temperature.Value - 32) / 1.8).toFixed(1)

        const weatherMessage = `Ramalan cuaca Yogyakarta hari ini : \nPagi : ${morningStatus} ${morningDegree}°C \nSiang : ${eveningStatus} ${eveningDegree}°C \nPagi : ${nightStatus} ${nightDegree}°C`

        logger.debug(weatherMessage)
        return weatherMessage
    } else {
        logger.error(`Error Happened : ${error}`);
    }
  } catch (error) {
    logger.error(`Error Happened : ${error}`);
  }
}

module.exports=mainWeather