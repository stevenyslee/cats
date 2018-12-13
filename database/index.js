const mysql = require('mysql');
const { host, user, password, database } = require('./config.js');

const connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database
});

const selectAll = (callback) => {
  connection.query('SELECT * FROM items', (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
