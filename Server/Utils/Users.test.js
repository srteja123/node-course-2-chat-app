const expect = require('expect');

const{Users} = require('./users');

describe('Users',() =>{
var users;
beforeEach(() =>{
  users = new Users();
  users.users =[{
    id: '1',
    name:'Mike',
    room:'Node Course'
  },{
    id: '2',
    name:'Jen',
    room:'React Course'
  },{
    id: '3',
    name:'Julie',
    room:'Node Course'
  }];
});


it('should add new user', () =>{
  var users = new Users();
  var user ={
    id :'123',
    name:'Ravi',
    room:'The Office bunch'
  };
  var resUser = users.addUser(user.id,user.name,user.room);
  expect(users.users).toEqual([user]);
});



it('should return names for node course', () =>{
  var userList = users.getUserList('Node Course');

  expect(userList).toEqual(['Mike','Julie']);



});

it('should return names for react course', () =>{


  var userList = users.getUserList('React Course');

  expect(userList).toEqual(['Jen']);

});
it('should remove a user', () =>{


  var userid ='2';

  var user = users.removeUser(userid);

  expect(user.id).toBe(userid);
expect(users.users.length).toBe(2);
});

it('should not remove a user', () =>{

  var userid ='28';

  var user = users.removeUser(userid);

  expect(user).toNotExist;
  expect(users.users.length).toBe(3);

});
it('should find a user', () =>{
  var userid ='2';

  var user = users.getUser(userid);

  expect(user.id).toEqual(userid);

});

it('should not find a user', () =>{
  var userid ='22';

  var user = users.getUser(userid);

  expect(user).toNotExist();

});


});
