const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:1,
      name:'Varun',
      room:'Node Course'
    },
    {
      id:2,
      name:'Saika',
      room:'HTML Course'
    },
    {
      id:3,
      name:'Cherry',
      room:'Node Course'
    }]
  })

  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id:123,
      name: 'Varun',
      room: 'Office Fans'
    }
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('Should return names for Node Course', () => {
    var usersList = users.getUserList('Node Course');
    expect(usersList).toEqual(['Varun', 'Cherry'])
  });

  it('Should return names for HTML Course', () => {
    var usersList = users.getUserList('HTML Course');
    expect(usersList).toEqual(['Saika'])
  });

  it('Should find a user', () => {
    var user = users.getUser(1);
    expect(user.name).toBe('Varun')
  });

  it('Should not find a user', () => {
    var user = users.getUser(4);
    expect(user).toNotExist()
  });

  it('Should remove a user', () => {
    var user = users.removeUser(1);
    expect(user.id).toBe(1)
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user', () => {
    var user = users.removeUser(99);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

});
