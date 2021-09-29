// https://sequelize.org/master/class/lib/model.js~Model.html
// https://sequelize.org/master/manual/raw-queries.html
// https://sequelize.org/master/variable/index.html#static-variable-QueryTypes

const Sequelize = require('sequelize');

const sequelize = new Sequelize('teste', 'lineset', '!qAz@wSx123', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});

module.exports = sequelize;

// logging: NODE_ENV === "production" ? false : console.log,
//  logging: false,
