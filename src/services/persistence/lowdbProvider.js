import ConfigLowDbDao from './configLowDbDao.js';
const low = require('lowdb');
const path = require('path');
const os = require('os');
const FileSystemApi = require('../api/fileSystemApi');
const TracksLowDbDao = require('./tracksLowDbDao.js');
module.exports = {
    DBPATH: path.join(os.homedir(), '.telescope', 'database.json'),
    createConnection: (path) => {
        if (FileSystemApi.exist(path)) {
            return low(path, { storage: require('lowdb/lib/storages/file-sync') });
        } else {
            if (FileSystemApi.mkdirp(path, '{}')) {
                return low(path, { storage: require('lowdb/lib/storages/file-sync') });
            } else
                return low();
        }
    },

    getConfigDao: (lowdbConnection) => {
        return new ConfigLowDbDao(lowdbConnection);
    },

    gettracksDao: (lowdbConnection) => {
        return new TracksLowDbDao(lowdbConnection);
    }
};