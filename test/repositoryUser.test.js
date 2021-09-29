const { RepositoryUser } = require('../src/repositoryUser');
const database = require('../src/db');

describe('RepositoryUser', () => {
  const repositoryUser = new RepositoryUser();

  it('Sync DB', async () => {
    const received = await database.sync();
    console.log(received);
    expect(received.config.database).toEqual('teste');
  });

  it('create user', async () => {
    const user = {
      name: 'Maria',
      cpf: '123.456.789-00',
    };
    const received = await repositoryUser.create(user);
    console.log(received);
    expect(received).toEqual({
      idUser: expect.any(Number),
      name: 'Maria',
      cpf: '123.456.789-00',
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });

  it('FindAll', async () => {
    const received = await repositoryUser.findAll();
    console.log(received);
    expect(received).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idUser: expect.any(Number),
          name: 'Maria',
          cpf: '123.456.789-00',
          updatedAt: expect.any(Date),
          createdAt: expect.any(Date),
        }),
      ])
    );
  });

  it('FindByPk', async () => {
    const receivedAll = await repositoryUser.findAll();
    const pk = receivedAll[0].idUser;
    const received = await repositoryUser.findByPk(pk);
    console.log(received);
    expect(received).toEqual(
      expect.objectContaining({
        idUser: pk,
        name: 'Maria',
        cpf: '123.456.789-00',
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      })
    );
  });

  it('UpDateById', async () => {
    const receivedAll = await repositoryUser.findAll();
    const pk = receivedAll[0].idUser;
    const user = {
      idUser: pk,
      name: 'Maria Silva',
      cpf: '000.000.000-11',
    };
    const received = await repositoryUser.updateById(user);
    console.log(received);
    expect(received).toEqual(
      expect.objectContaining({
        idUser: pk,
        name: 'Maria Silva',
        cpf: '000.000.000-11',
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      })
    );
  });

  describe('DeleteById', () => {
    it('DeleteById Where', async () => {
      const newUser = await repositoryUser.create({
        name: 'João Silva',
        cpf: '999.999.999.99',
      });
      const received = await repositoryUser.deleteByIdWhere(newUser.idUser);
      console.log(received);
      expect(received).toEqual(1);
    });

    it('DeleteById Model', async () => {
      const newUser = await repositoryUser.create({
        name: 'João Silva',
        cpf: '999.999.999.99',
      });
      const received = await repositoryUser.deleteByIdModel(newUser.idUser);
      console.log(received);
      expect(received).toEqual(
        expect.objectContaining({ name: 'João Silva', cpf: '999.999.999.99' })
      );
    });
  });
});
