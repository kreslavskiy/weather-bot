'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

const WEATHER_DATA = {
  MIN_TEMP: '#bd1 > div.temperature > div.min > span',
  MAX_TEMP: '#bd1 > div.temperature > div.max > span',
  RIGHT_NOW: '#bd1c > div.wMain.clearfix > div.lSide > div.imgBlock > p.today-temp',
  MIN_TEMP_TMRW: '#bd2 > div.temperature > div.min > span',
  MAX_TEMP_TMRW: '#bd2 > div.temperature > div.max > span',
  DESCR_TMRW: '#bd2c > div.wDescription.clearfix > div.rSide > div',
};

const parse = async (cityName, type) => {
  const cityURL = encodeURI(cityName.toLowerCase());
  const data = await axios.get(`https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-${cityURL}`)
    .then(html => {
        const $ = cheerio.load(html.data);
        const text = $(WEATHER_DATA[type]).text();
        return text;
    });
  return data;
};

module.exports = { parse };
