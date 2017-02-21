const express = require('express');

const User = require('./Database');

const bodyParser = require('body-parser');

const app = express();

const dotenv = require('dotenv').config({ path: 'C:/Users/dell/Documents/MyTinder/MyTinder/.env' });

const Authenticate = require('./authentication');

const Profile = require('./UserProfiles');

const Amazon = require('./AWS');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// dotenv.load();

Amazon.listBuckets();

var jake = new User({
  name: 'John',
  username: 'Chris2',
  password: '1234'
});

app.get('/', (req, res) => {
  console.log('ping!');

  User.find({}, (err, users) => {
  console.log('err:', err);
  console.log('users:', users);
});

jake.save((err) => {
  console.log('User Saved', err);
  User.find({}, (err2, users) => {
    console.log('inside err:', err2);
    console.log('inside users:', users);
  });
});
  res.send('Hello World!');
});

app.get('/signIn', (req, res) => {
  console.log('signing user in');
  res.send('signed in!');
});

app.post('/signIn', (req, res) => {
  console.log('res', req.body);
  //check if user account exists, then create or log in.
  Authenticate.findAccount(req.body.email, req.body.password)
    .then((result) => {
      console.log('results', result);
      res.send(result[0]._id);
    });
});

app.get('/profile/:id', (req, res) => {
  console.log('user id', req.params.id);
  Profile.grabUserProfile(req.params.id)
    .then(result => {
      res.send(result);
    });
  //find the mongo bucket with this id's information.
});

app.post('/profile/:id/image', (req, res) => {
  console.log('posting image');
  Profile.postNewImage(req.params.id, req.body.image, req.body.imageNumber)
    .then((result) => {
      console.log('resulting', result);
      res.send('all done');
    });
});

app.get('/profile/:id/pictures', (req, res) => {
  console.log('grabbing pictures');
  Profile.getPictures(req.params.id)
    .then(result => {
      console.log('LOOK AT THIS')
      res.send('result');
    });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
