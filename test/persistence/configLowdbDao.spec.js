const PersistenceFactory = require('../../app/persistence/persistenceFactory.js');
const expect = require("chai").expect;

const provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
const connection = provider.createConnection(provider.DBPATH);

describe('Config Lowdb Dao', () => {
    describe('initialize works', () => {
        it('works', () => {
            expect(provider.getConfigDao(connection).CONFIG).to.equal("config");
        });
    });

    describe('set value in config', () => {
        it('works', () => {
            var configDao = provider.getConfigDao(connection);
            configDao.set("username", "jchevalay");
        });
    });

    describe('get value in config', () => {
        it('works', () => {
            var configDao = provider.getConfigDao(connection);
            var value = configDao.get("username");
            expect(value).to.equal("jchevalay");
        });

        it('params not exist', () => {
            var configDao = provider.getConfigDao(connection);
            var value = configDao.get("password");
            console.log(value);
            expect(value).to.equal(undefined);
        });
    });
});