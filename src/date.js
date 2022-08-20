'use strict';

const MONTHS = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

const getDate = () => {
  const date = new Date();
  const text =
    `${date.getDate()} ` +
    `${MONTHS[date.getMonth()]}`;
  return text;
};

const getTomorrowsDate = () => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const text =
    `${tomorrow.getDate()} ` +
    `${MONTHS[tomorrow.getMonth()]}`;
  return text;
};

module.exports = { getDate, getTomorrowsDate };
