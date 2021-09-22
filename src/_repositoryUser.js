const { Sequelize } = require("sequelize");
const sequelize = require("./db");

class RepositoryUser {
  async create(obj, transaction) {
    const modelUser = this.getModelUser();
    const result = await modelUser.create(obj, { transaction });
    return result;
  }

  async createAll(obj, transaction) {
    const modelUser = this.getModelUser();
    let count = 0;
    for (let user of obj) {
      const result = await modelUser.create(user, { transaction });
      count++;
      if (count === 3) {
        throw new Error("Forçando!");
      }
    }
    return count;
  }

  async findOrCreate(user, transaction) {
    const modelUser = this.getModelUser();
    let options = {
      defaults: user,
      where: {
        firstName: user.firstName,
      },
      transaction,
    };
    const result = await modelUser.findOrCreate(options);
    return result;
  }

  
  async findOrCreateAll(obj, transaction) {
    const modelUser = this.getModelUser();
    let count = 0;
    for (let user of obj) {
      let options = {
        defaults: user,
        where: {
          firstName: user.firstName,
        },
        transaction,
      };
      const result = await modelUser.findOrCreate(options);
      count++;
      // if (count === 3) {
      //   throw new Error("Forçando!");
      // }
    }
    return count;
  }

  async getTransaction() {
    return await sequelize.transaction();
  }

  getModelUser() {
    return sequelize.define(
      "user",
      {
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
      },
      {
        freezeTableName: true,
      }
    );
  }
}
module.exports = { RepositoryUser, sequelize };
