var moment  = require('moment');

var generateMsg = (from,text) => {
  return{
    from,
    text,
    createAt: moment().valueOf()

  };
};

var generateLocMsg = (from,latitude,longitude) => {
  return{
    from,
   url:`https://www.google.com/maps?q=${latitude},${longitude}`,
   createAt: moment().valueOf()

  };
};
module.exports = {generateMsg,generateLocMsg};
