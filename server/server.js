const { registerCat, randomCat, checkPassword, updateLastDate } = require('./../database/index.js');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const app = express();

// const test = {
//   addedAt: '2018-12-01',
//   breed: 'Siamese',
//   birthdate: '2018-01-01',
//   imageUrl: 'http://honesttopaws.com/wp-content/uploads/sites/5/2017/05/banana-cat-1.png',
//   lastSeenAt: '2018-12-12',
//   name: 'Enji1',
//   username: 'EnjiKim',
//   password: 'ilovecats',
//   weight: 100.33
// }

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/cat/register', (req, res) => {
  if (!req.body.name) return res.send('Name invalid');
  if (!req.body.username) return res.send('Username invalid');
  if (req.body.password < 8) return res.send('Password must be longer than 8 characters');

  bcrypt.hash(req.body.password, saltRounds, (hashErr, hash) => {
    if (hashErr) return res.send(hashErr);
    req.body.password = hash;
    registerCat(req.body, (err, response) => {
      if (err) return res.send(err);
      return res.send(response);
    });
  });
});


app.put('/cat/login', (req, res) => {
  checkPassword(req.body, (err, response) => {
    if (err) return res.send(err);
    if (!response.length) return res.send('No such username');

    bcrypt.compare(req.body.password, response[0].password, (err, resHash) => {
      if (err) return res.send('Password Incorrect');
      updateLastDate(req.body.username, (err, resDate) => {
        if (err) return res.send(err);
        return res.send('send token');
      });
    })
  });
});


app.get('/cats', (req, res) => res.send('Hello World!'));


app.get('/cats/random', (req, res) => {
  randomCat((err, response) => {
    if (err) return res.send(err);
    return res.send(response);
  });
});

app.listen(3000, () => console.log('App listening on port 3000'));
