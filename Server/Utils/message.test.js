var expect = require('expect');
var {generateMsg,generateLocMsg} = require('./message');
describe('generateMsg',()=>{
  it('should generate correct message object',()=>{
    var from ='Jen';
    var text ='Some message';
    var message = generateMsg(from,text);
    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from,text});

  });
});

describe('generateLocMsg',() =>{
it('should generate correct location',() =>{
var from ='Dave';
var latitude = 12;
var longitude = 16;
var url = 'https://www.google.com/maps?q=12,16';
var message = generateLocMsg(from,latitude,longitude);
expect(message.createAt).toBeA('number');
expect(message).toInclude({from,url});

});
});
