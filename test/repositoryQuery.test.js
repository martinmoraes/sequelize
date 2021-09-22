const { RepositoryQuery } = require('../src/repositoryQuery');

describe('RepositoryQuery', () => {
  const repositoryQuery = new RepositoryQuery();

  it('Query Type', async () => {
    const received = await repositoryQuery.queryType('select * from user');
    console.log(received);
    expect(received).toEqual(expect.arrayContaining([]));
  });
  it('Query', async () => {
    const received = await repositoryQuery.query('select * from user');
    console.log(received);
    expect(received).toEqual(expect.arrayContaining([]));
  });
});
