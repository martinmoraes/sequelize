const { ModelUser } = require('./modelUser');

class RepositoryUser {
  async create(user) {
    const received = await ModelUser.create(user);
    return received.dataValues;
  }

  async findAll() {
    const users = await ModelUser.findAll();
    return users;
  }

  async findByPk(pk) {
    const user = await ModelUser.findByPk(pk);
    return user;
  }

  async updateById(user) {
    const userToChange = await this.findByPk(user.idUser);
    Object.entries(user).forEach(([key, value]) => {
      userToChange[key] = value;
    });

    const result = await userToChange.save();
    return result;
  }

  async deleteByIdWhere(idUser) {
    const received = await ModelUser.destroy({ where: { idUser } });
    return received;
  }
  async deleteByIdModel(idUser) {
    const userModel = await this.findByPk(idUser);
    const received = userModel.destroy();
    return received;
  }
}

module.exports = { RepositoryUser };
