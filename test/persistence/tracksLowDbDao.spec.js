const PersistenceFactory = require('../../app/persistence/persistenceFactory.js');
const expect = require("chai").expect;

const provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
const connection = provider.createConnection(provider.DBPATH);
const entity = { _id: 1, title: "martine à la plage", hash: "QMA6546fefrgrgrg" };

describe('tracks LowDb dao', () => {
    describe('initialize works', () => {
        it('works', () => {
            expect(provider.gettracksDao(connection).TRACKS).to.equal("tracks");
        });
    });

    describe('create a tracks', () => {
        it('works', () => {
            var tracksDao = provider.gettracksDao(connection);
            tracksDao.create(entity);
        });
    });

    describe('get entities', () => {
        it('works', () => {
            var tracksDao = provider.gettracksDao(connection);
            var tracks = tracksDao.get();
            expect(tracks.length).to.deep.equal(1);
        });
    });

    describe('get entity by id', () => {
        it('works', () => {
            var tracksDao = provider.gettracksDao(connection);
            var track = tracksDao.findById(entity._id);
            expect(track.title).to.equal(entity.title);
        });
    });

    describe('update entity', () => {
        it('works', () => {
            var tracksDao = provider.gettracksDao(connection);
            var temp = entity;
            temp.title = "works";
            tracksDao.update(temp);
            var track = tracksDao.findById(entity._id)
            expect(track.title).to.equal("works");
        });
    });

});