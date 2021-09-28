const { RepositoryUser, sequelize } = require('../src/_repositoryUser');
const { User } = require('../src/_user');

describe('RepositoryUser', () => {
  beforeAll(async () => {});

  let repositoryUser;
  let user;
  beforeEach(() => {
    repositoryUser = new RepositoryUser();
    user = new User(repositoryUser);
  });

  const user01 = {
    firstName: 'martin',
    lastName: 'moraes',
  };
  const user02 = {
    firstName: 'danilo',
    lastName: 'moraes',
  };
  const user03 = {
    firstName: 'juliana',
    lastName: 'moraes',
  };

  it('DB', async () => {
    const received = await sequelize.sync();
    console.log(received);
    expect(received.config.database).toEqual('teste');
  });

  it('Create um a um', async () => {
    try {
      const transaction = await repositoryUser.getTransaction();
      let received = await repositoryUser.create(user01, transaction);
      received = await repositoryUser.create(user02, transaction);
      received = await repositoryUser.create(user03, transaction);
      received = await repositoryUser.create(user01, transaction);
      received = await repositoryUser.create(user02, transaction);
      received = await repositoryUser.create(user03, transaction);
    } catch (error) {
      console.log(error);
    }
  });

  it('Create em array', async () => {
    let received;
    try {
      const transaction = await repositoryUser.getTransaction();
      const user = [user01, user02, user03, user01, user02, user03, user01, user02, user03];
      received = await repositoryUser.createAll(user, transaction);
      console.log(received);
      //   transaction.commit();
    } catch (error) {
      console.log(error);
    }
    expect(received).toEqual(9);
  });

  it('Create em FindOrCreateAll', async () => {
    let received;
    try {
      const transaction = await repositoryUser.getTransaction();
      const user = [user01, user02, user03, user01, user02, user03, user01, user02, user03];
      received = await repositoryUser.findOrCreateAll(user, transaction);
      console.log(received);
      await transaction.commit();
      // received = await repositoryUser.findOrCreateAll(user, transaction);
      // console.log(received);
      // await transaction.commit();
    } catch (error) {
      console.log(error);
    }
    expect(received).toEqual(9);
  });

  it('Multi transaction', async () => {
    let received;
    try {
      const transactionA = await repositoryUser.getTransaction();
      const transactionB = await repositoryUser.getTransaction();
      const user = [user01, user02, user03, user01, user02, user03, user01, user02, user03];
      received = await repositoryUser.findOrCreateAll(user, transactionA);
      console.log(received);
      await transactionA.commit();

      received = await repositoryUser.findOrCreateAll(user, transactionB);
      console.log(received);
      await transactionB.commit();
    } catch (error) {
      console.log(error);
    }
    expect(received).toEqual(9);
  });

  it('Sincrono Multi', async () => {
    jest.setTimeout(500000);
    let received = await user.makeRequestSyncrono();
    console.log(received.length);
    expect(received).toEqual(5);
  });

  it('Asincrono Multi', async () => {
    jest.setTimeout(500000);
    let received = await user.makeRequestAsyncrono();
    console.log(received.length);
    expect(received).toEqual(5);
  });

  it('Random', () => {
    const received = user.random();
    console.log(received);
    expect(received).toEqual(expect.any(String));
  });
});
