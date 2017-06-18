import LoggerService from '../../../../logger'
import FileSystemApi from '../../../fileSystemApi';
import TopcisTelescop from '../topics';
import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';

const logger = new LoggerService();
logger.level = "debug";

export default function(event, data){
    "use strict";
    logger.debug(TopcisTelescop.GET_FILES, " data = ", data);
    event.returnValue = "pong";
};