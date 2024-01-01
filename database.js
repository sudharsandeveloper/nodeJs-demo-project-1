// database.js

const { Sequelize } = require('sequelize');
const path = require('path');

let config;

if (process.env.NODE_ENV === 'production') {
  config = require(path.join(__dirname, '.', 'config', 'config.json'))['production'];
} else if (process.env.NODE_ENV === 'test') {
  config = require(path.join(__dirname, '.', 'config', 'config.json'))['test'];
} else {
  config = require(path.join(__dirname, '.', 'config', 'config.json'))['development'];
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

module.exports = sequelize;
