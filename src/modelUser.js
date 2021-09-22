const { DataTypes } = require('sequelize');
const database = require('./db');

const ModelUser = database.define(
  'user',
  {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    cpf: { type: DataTypes.CHAR },
  },
  {
    freezeTableName: true,
  }
);

module.exports = { ModelUser };
