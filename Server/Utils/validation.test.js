const expect = require('expect');
const {isRealString} = require('./validation.js');


describe('isRealString',() =>{
  it('Should reject non-string values',() =>{
    var res = isRealString(98);
    expect(res).toBe(false);
  });
  it('Should reject string with only spaces',() =>{
    var res = isRealString('           ');
    expect(res).toBe(false);
  });
  it('Shuld allow string with non-space characters',() =>{
    var res = isRealString('   Ravi     ');
    expect(res).toBe(true);
  });
});
