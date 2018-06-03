var expect = require('expect');
var {generateMsg} = require('./message');
describe('generateMsg',()=>{
  it('should generate correct message object',()=>{
    var from ='Jen';
    var text ='Some message';
    var message = generateMsg(from,text);
    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from,text});

  });
});
