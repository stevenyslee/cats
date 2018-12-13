const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/cats', (req, res) => res.send('Hello World!'));

app.post('/cat/register', (req, res) => res.send('Hello World!'));

app.put('/cat/login', (req, res) => res.send('Hello World!'));

app.get('/cats/random', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('App listening on port 3000'));
