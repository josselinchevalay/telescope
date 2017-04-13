const lowdbProvider = require('./lowdbProvider.js');
var PersistenceFactory = () => {
    return {
        LOWDB: 1,
        getPorvider: (wichProvider) => {
            switch (wichProvider) {
                case 1:
                    return lowdbProvider;
                    break;
                default:
                    return null;
            }
        }
    };
};

PersistenceFactory.LOWDB = 1;

module.exports = PersistenceFactory();