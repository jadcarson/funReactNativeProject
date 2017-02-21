const User = require('./Database');

module.exports = {
  findAccount,
  logIn,
  createAccount
};

function findAccount(email, password) {
    return User.find({ username: email }, (err, user) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('user', user);
  })
    .then((result) => {
      console.log('here are results', result);
      if (result.length === 0) {
        return createAccount(email, password);
      } else {
        //encrypt and check password
        if (result[0].password === password) {
          return result;
        }
        return false;
      }
    });
}

function logIn(user, password) {
  if (user.password === password) {
    return true;
  } 
  console.log('bad password');
  return false;
}

function createAccount(email, password) {
  const newUser = User({
    username: email,
    password
  });
  return newUser.save((err, user) => {
    if (err) throw err;
    console.log('User Created', user);
    return user;
  })
  .then((result) => {
    console.log('result', result);
    return result; 
  });
}
