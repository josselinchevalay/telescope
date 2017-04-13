const lowDBProvider = require('../../app/persistence/lowdbProvider.js');
const FileSystemApi = require('../../app/api/fileSystemApi/');
const expect = require("chai").expect;
const path = require('path');
const os = require('os');
const low = require('lowdb');

describe('Persistence Provider Lowdb', () => {
    describe('final properties', () => {
        it('DBPATH ', () => {
            expect(lowDBProvider.DBPATH).to.equals(path.join(os.homedir(), '.telescope', 'database.json'));
        });
    });

    describe('create connection', () => {
        it('use dbpath ', () => {
            expect(lowDBProvider.createConnection(lowDBProvider.DBPATH).source).to.equals(lowDBProvider.DBPATH);
            FileSystemApi.removeFile(lowDBProvider.DBPATH);
            var dirPath = lowDBProvider.DBPATH.split(path.sep).splice(0, lowDBProvider.DBPATH.split(path.sep).length - 1).join(path.sep);
            FileSystemApi.removeDir(dirPath);
        });
    });
});