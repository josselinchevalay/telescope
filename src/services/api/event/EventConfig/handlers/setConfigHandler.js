import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';
import LoggerService from '../../../../logger';

const logger = new LoggerService();
logger.level = "debug";

export default function(event, data){
    "use strict";
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var configDao  = provider.getConfigDao(connection);    
    var config  = JSON.parse(data);
    configDao.set("",config);
    logger.debug("telescop/config/set data = ", data);
    event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"config saved !", level:"success", autoDismiss:2}));
};