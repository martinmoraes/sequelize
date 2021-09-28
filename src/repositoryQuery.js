// https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
// https://sequelize.org/master/manual/raw-queries.html
// https://sequelize.org/master/variable/index.html#static-variable-QueryTypes
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
