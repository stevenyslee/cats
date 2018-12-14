const mysql = require('mysql');
const { host, user, password, database } = require('./config.js');

let connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database
});

const registerCat = ({ addedAt, breed, birthdate, imageUrl, lastSeenAt, name, username, password, weight }, callback) => {
  connection.query(`INSERT INTO cats (addedAt, breed, birthdate, imageUrl, lastSeenAt, name, username, password, weight) VALUES ('${addedAt}', '${breed}', '${birthdate}', '${imageUrl}', '${lastSeenAt}', '${name}', '${username}', '${password}', ${weight})`, (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const randomCat = (callback) => {
  connection.query(`SELECT imageUrl, name, breed FROM cats ORDER BY RAND() LIMIT 1;`, (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const checkPassword = ({ username }, callback) => {
  connection.query(`SELECT password FROM cats WHERE username = '${username}';`, (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updateLastDate = ({ username }, callback) => {
  let date = new Date().toISOString().slice(0,10);
  connection.query(`UPDATE cats SET lastSeenAt = ${date} WHERE username = '${username}';`, (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  registerCat,
  randomCat,
  checkPassword,
  updateLastDate
};
