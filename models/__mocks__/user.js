const users = [
    {
      email: "test_3@mail.com",
      password: "123456",
      subscription: "starter",
      avatarURL: "pathtoavatar",
      token: null,
    },
  ]

class User {
  constructor({email, password, subscription = "starter", avatarURL}) {
    this.email = email;
    this.password = password;
    this.subscription = subscription;
    this.avatarURL = avatarURL;
  }

  static findOne = function ({email: emailS}) {
    return users.find(user => user.email === emailS) ;
  };

  setPassword = function (password) {
    this.password = password;
  };

  save = function () {
    return true;
  };
}

module.exports = { User }