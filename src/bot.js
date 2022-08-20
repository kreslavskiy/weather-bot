'use strict';

const { Telegraf } = require('telegraf');
const { parse } = require('./parser.js');
const { getDate, getTomorrowsDate } = require('./date.js');
const fs = require('fs');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const GIFS = [
  'CgACAgIAAxkBAAIGB2MBCirRtrVIh0kbGj6KvGRCtpTeAAJEIAACjkSpSh6ZkZopN-OEKQQ',
  'CgACAgIAAxkBAAIGCmMBCjBcZqJgOnElLJ5jEQPlc0ZXAALfFAACBirpSeZR4oLyDuvVKQQ',
  'CgACAgIAAxkBAAIGDWMBCjZC5-h-teBSfMI7_E3_0eQPAALyIAACqErwSo62bcukqE-CKQQ',
  'CgACAgIAAxkBAAIGDmMBCjsggJnfQRsr8QtmzCUN4lmUAALQGQACKw-5StLES3V9FCc0KQQ',
  'CgACAgIAAxkBAAIGD2MBCkN0tlHM2iJL4fV9XMwvR2SLAAKOGAAC5fXRSSSB-2j4qs7TKQQ',
  'CgACAgIAAxkBAAIGEWMBCl_Re03kQKmuXhltA5zYFpzgAAK7GAAC0nDpSRzRf72PXQjMKQQ',
  'CgACAgIAAxkBAAIGE2MBCl9aKhoTKZ3Zdto3xluJziFAAAI2GQACvMG4SbPl67lz7Y91KQQ',
  'CgACAgIAAxkBAAIGEGMBCl_abthWXZsnXybhTmt_tCUhAAK1FwAC47xoSHf7MX2D_vJHKQQ',
  'CgACAgIAAxkBAAIGEmMBCl9BEQdQAAFila0bMBEcK0DTJgACgBoAAn79GEqH1Y044I7BCykE',
  'CgACAgIAAxkBAAIGFGMBCl_l_gABxDu-QzVCFvBAZPkyFQACTR0AAh3AgUtlJeHobKlYkikE',
  'CgACAgIAAxkBAAIGFWMBCmhq-01lYLgs6u2nrj6JMQQaAALUGQACKw-5SltRkj8g3z-SKQQ',
  'CgACAgIAAxkBAAIGFmMBCpo4DdbsKzzwmNzob43znrAjAAI2GQACvMG4SbPl67lz7Y91KQQ',
  'CgACAgQAAxkBAAIGNWMBDLh0ldxYVNTKXRizdD0eDVEZAAJ1AwACYCAFU94e2ssI_DwdKQQ',
  'CgACAgIAAxkBAAIGNmMBDLjq0EXFbNhyQxKirSRTUueWAAKxGQAC34axSa80mdZ6D9STKQQ',
  'CgACAgQAAxkBAAIGN2MBDLr-EjkNYyNH-wZeFDqzrii3AAKjAgACRZT0UWWh8_f0jFRtKQQ',
];

bot.start((ctx) => ctx.reply('Welcome'));

bot.help((ctx) => {
  ctx.reply(
    '/today + назва міста – погода у цьому місту сьогодні\n' +
      '/tmrw + назва міста – погода у цьому місту завтра\n' +
      '/woman – покаже тобі рандомну жінку'
  );
});

bot.command('today', async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  console.log(ctx.message.from.username + ': ' + input);
  try {
    const [max, min, now] = await parse(
      input,
      'MAX_TEMP',
      'MIN_TEMP',
      'RIGHT_NOW'
    );
    const text =
      `Сьогодні ${getDate()}\n` +
      `Зараз ${now}.\n` +
      `Мінімальна температура – ${min}С.\n` +
      `Максимальна температура – ${max}С.`;
    ctx.replyWithPhoto({ source: 'temperature/dima.jpg' }, { caption: text });
  } catch (err) {
    console.log(err.message);
    ctx.replyWithMarkdown('Не можу знайти це місто');
  }
});

bot.command('tmrw', async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  try {
    const max = await parse(input, 'MAX_TEMP_TMRW');
    const min = await parse(input, 'MIN_TEMP_TMRW');
    const text =
      `Завра ${getTomorrowsDate()}\n` +
      `Мінімальна температура – ${min}С.\n` +
      `Максимальна температура – ${max}С.`;
    ctx.replyWithPhoto({ source: 'temperature/dima.jpeg' }, { caption: text });
  } catch (err) {
    console.log(err);
    ctx.reply('Не можу знайти це місто');
  }
});

bot.command('woman', (ctx) => {
  const chance = Math.round(Math.random() * 19) + 1;
  ctx.replyWithPhoto({ source: `women/${chance}.jpeg` });
});

bot.command('trevoga', (ctx) => {
  const chance = Math.round(Math.random() * GIFS.length);
  ctx.replyWithAnimation(GIFS[chance]);
});

// bot.on('animation', async (ctx) => {
//   const username = ctx.update.message.from.username;
//   const idGif = ctx.update.message.animation.file_id;
//   if (username === 'MrPaschenko' || username === 'Nikita_Sutulov')
//     await fs.promises.appendFile('gifs.txt', '\'' + idGif + '\',\n');
// });

bot.launch();
