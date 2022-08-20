'use strict';

const { Telegraf } = require('telegraf');
const { parse } = require('./parser.js');
const { getDate, getTomorrowsDate } = require('./date.js');
require('dotenv').config();

const bot = new Telegraf (process.env.BOT_TOKEN);

const GIFS = {
  1: 'CgACAgIAAx0CXbX_GgACs2hitNBd66VvXTrGsM99HuygA64UYAACjhgAAuX10Ukkgfto-KrO0ykE',
  2: 'CgACAgIAAx0CXbX_GgACs2pitNBfvZKqCSVkA2q2v5ur5Ash0wACsRkAAt-GsUmvNJnWeg_UkykE',
  3: 'CgACAgIAAx0CXbX_GgACs3xitNDoG5fABjaThgecGHF-aodhqgACExkAAiVWuUosqS5k4xKw2CkE',
  4: 'CgACAgIAAx0CXbX_GgACtAZitNY-tTlC-EL_PtDaiGfxrk6gewACgBoAAn79GEqH1Y044I7BCykE',
  5: 'CgACAgIAAx0CXbX_GgACvERiuH9B1_pNURC8UocE7TLDPtTdQgACtRcAAuO8aEh3-zF9g_7yRykE',
};

bot.start((ctx) => ctx.reply('Welcome'));

bot.help(ctx => {
  ctx.reply('/today + назва міста – погода у цьому місту сьогодні\n'+
            '/tmrw + назва міста – погода у цьому місту завтра\n'+
            '/woman – покаже тобі рандомну жінку');
});

bot.command('today', async ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  console.log(ctx.message.from.username + ': ' + input);
  try {
    const max = await parse(input, 'MAX_TEMP');
    const min = await parse(input, 'MIN_TEMP');
    const now  = await parse(input, 'RIGHT_NOW');
    const text = `Сьогодні ${getDate()}\n` +
                 `Зараз ${now}.\n` +
                 `Мінімальна температура – ${min}С.\n` +
                 `Максимальна температура – ${max}С.`;
    ctx.replyWithPhoto({ source: 'temperature/dima.jpg' }, { caption: text });
  } catch (err) {
    console.log(err.message);
    ctx.replyWithMarkdown('Не можу знайти це місто');
  }
});

bot.command('tmrw', async ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  try {
    const max = await parse(input, 'MAX_TEMP_TMRW');
    const min = await parse(input, 'MIN_TEMP_TMRW');
    const text = `Завра ${getTomorrowsDate()}\n` +
                 `Мінімальна температура – ${min}С.\n` +
                 `Максимальна температура – ${max}С.`;
    ctx.replyWithPhoto({ source: 'temperature/dima.jpeg' }, { caption: text });      
  } catch (err) {
    console.log(err);
    ctx.reply('Не можу знайти це місто');
  }
});

bot.command('woman', ctx => {
  const chance = Math.round(Math.random() * 19) + 1;
  ctx.replyWithPhoto({ source: `women/${chance}.jpeg` });      
});

bot.command('trevoga', (ctx) => {
  const chance = Math.round(Math.random() * 4 + 1);
  ctx.replyWithAnimation(GIFS[chance]);
});

bot.launch();
