'use strict';

const MONTHS = {
  0: 'січня',
  1: 'лютого',
  2: 'березня',
  3: 'квітня',
  4: 'травня',
  5: 'червня',
  6: 'липня',
  7: 'серпня',
  8: 'вересня',
  9: 'жовтня',
  10: 'листопада',
  11: 'грудня',
};

const WEEKDAYS = {
  0: 'неділя',
  1: 'понеділок',
  2: 'вівторок',
  3: 'середа', 
  4: 'четвер',
  5: 'пʼятниця',
  6: 'субота',
};

const getDate = () => {
  const date = new Date();
  const text = `${WEEKDAYS[date.getDay()]}, ` +
               `${date.getDate()} ` + 
               `${MONTHS[date.getMonth()]}.`;
  return text;
};

const getTomorrowsDate = () => {
  const today = new Date();
  let tomorrow =  new Date();
  tomorrow.setDate(today.getDate() + 1);
  const text = `${WEEKDAYS[tomorrow.getDay()]}, ` +
               `${tomorrow.getDate()} ` + 
               `${MONTHS[tomorrow.getMonth()]}.`;
  return text;
}

module.exports = { getDate, getTomorrowsDate };
