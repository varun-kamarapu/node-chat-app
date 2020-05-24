class Users{

  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
  }

  getUser(id){
    var user = this.users.filter((user) => user.id === id );
    return user[0];
  }

  getUserList(room){
    var usersInSameRoom = this.users.filter((user) => user.room === room )
    //var usersInSameRoom = _.filter(this.users, {room})
    var namesArray = usersInSameRoom.map((user) => user.name)
    return namesArray;
  }

  removeUser(id){
    var user = this.getUser(id);

    if(user){
    this.users = this.users.filter((user) => user.id !== id );
    }
    return user;

  }

}

module.exports = {Users}
