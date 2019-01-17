const moment = require('moment');

var generateMessage = (from, text) => {
var date = new Date().getTime()
return {
  from,
  text,
  createdAt: moment(date).format('hh:mm a')
       };
};

var generateGeoMessage = (from, lat, lon) => {
var date = new Date().getTime()
return {
  from,
  lat,
  lon,
  createdAt: moment(date).format('hh:mm a')
       };
};

module.exports = {generateMessage, generateGeoMessage}
