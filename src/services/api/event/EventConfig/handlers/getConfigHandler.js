import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import LoggerService from '../../../../logger';
import Topics from '../topics';

const logger = new LoggerService();
logger.level = "debug";

export default function(event, data){
    "use strict";
    logger.debug(Topics.CONFIG_GET);
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var configDao  = provider.getConfigDao(connection);    
    var config = configDao.get("") || "";
    event.returnValue = JSON.stringify(config); // TODO replace later by notification send
};