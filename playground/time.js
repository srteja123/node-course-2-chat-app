//Jan 1 st 1970 00:00:00 am

var moment  = require('moment');
var date = moment();
date.add(100,'year');
console.log(date.format('h:mm a'));
