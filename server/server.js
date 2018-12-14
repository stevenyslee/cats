const { registerCat, randomCat, checkPassword, updateLastDate, selectCats } = require('./../database/index.js');
const { cert, saltRounds } = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/cat/register', (req, res) => {
  if (!req.body.name) return res.status(400).send({ error: 'Name invalid' });
  if (!req.body.username) return res.status(400).send({ error: 'Username invalid'});
  if (req.body.password < 8) return res.status(400).send({ error: 'Password must be longer than 8 characters'});

  bcrypt.hash(req.body.password, saltRounds, (hashErr, hash) => {
    if (hashErr) return res.status(500).send({ error: hashErr });
    req.body.password = hash;
    registerCat(req.body, (err, response) => {
      if (err) return res.status(500).send({ error: err });
      return res.status(200).send(response);
    });
  });
});


app.put('/cat/login', (req, res) => {
  checkPassword(req.body, (err, response) => {
    if (err) return res.status(500).send({ error: err });
    if (!response.length) return res.status(400).send({ error: 'No such username' });

    bcrypt.compare(req.body.password, response[0].password, (err, resHash) => {
      if (err) return res.status(400).send({ error: 'Password Incorrect'});
      updateLastDate(req.body.username, (err, resDate) => {
        if (err) return res.status(500).send({ error: err });
        let token = jwt.sign({ username: req.body.username, password: response[0].password }, cert, { algorithm: 'HS256', expiresIn: 86400 }, (err, token) => {
          return res.status(200).send({ auth: true, token });
        });
      });
    })
  });
});


app.get('/cats', (req, res) => {
  let [ bearer, token ] = req.headers.authorization.split(' ');
  jwt.verify(token, cert, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    selectCats(req.body, (err, response) => {
      res.status(200).send(response);
    })
  });
});


app.get('/cats/random', (req, res) => {
  randomCat((err, response) => {
    if (err) return res.status(500).send({ error: err });
    return res.status(200).send(response);
  });
});

app.listen(8081, () => console.log('App listening on port 8081'));
