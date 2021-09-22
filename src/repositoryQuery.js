// https://sequelize.org/master/manual/raw-queries.html
const { QueryTypes } = require('sequelize');
const database = require('./db');

class RepositoryQuery {
  async queryType(sql) {
    return await database.query(sql, { type: QueryTypes.SELECT });
  }
  async query(sql) {
    return await database.query(sql);
  }
}
module.exports = { RepositoryQuery };
