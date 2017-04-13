const expect = require("chai").expect;
const path = require('path');
const PersistenceFactory = require('../../app/persistence/persistenceFactory.js');
const lowDBProvider = require('../../app/persistence/lowdbProvider.js');

describe('Persistence factory', () => {
    describe('final properties', () => {
        it('LowDB ', () => {
            expect(PersistenceFactory.LOWDB).to.equals(1);
        });
    });
    describe('getProvider', () => {
        it('sucess', () => {
            expect(PersistenceFactory.getPorvider(PersistenceFactory.LOWDB)).to.equals(lowDBProvider);
        });
        it('fail', () => {
            expect(PersistenceFactory.getPorvider(2)).to.equals(null);
        });
    });
});