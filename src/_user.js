class User {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    return await this.makeRequestSyncrono();
  }

  async makeRequestSyncrono() {
    let continua = 0;
    let obj;
    do {
      let transaction;
      try {
        transaction = await this.repository.getTransaction();
        obj = await this._request();
        await this.repository.findOrCreateAll(obj, transaction);
        await transaction.commit();
      } catch (error) {
        console.log(error);
      }
      continua++;
    } while (continua < 5);
    return continua;
  }

  async makeRequestAsyncrono() {
    let continua = 0;
    let obj;
    do {
      let transaction;
      try {
        transaction = await this.repository.getTransaction();
        obj = await this._request();
        const persists = [];
        for (const user of obj) {
          persists.push(this.repository.findOrCreate(user, transaction));
        }
        const result = Promise.all(persists);
        await transaction.commit();
      } catch (error) {
        console.log(error);
      }
      continua++;
    } while (continua < 5);
    return continua;
  }

  _request() {
    return new Promise((resolve, reject) => {
      const data = [];
      for (let x = 1; x <= 1000; x++) {
        data.push({
          firstName: "Sofia" + this.random(),
          lastName: "moraes",
        });
      }
      resolve(data);
    });
  }

  random() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
  }
}

module.exports = { User };
