import LoggerService from '../../../../logger';
import TopcisTelescop from '../topics';
import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';

const logger = new LoggerService();
logger.level = "debug";

export default function(event, data){
    "use strict";
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var tracksDao = provider.gettracksDao(connection);
    logger.debug(TopcisTelescop.UPDATE_COMMIT, "data = ", data);
    var data = JSON.parse(data);
    logger.debug(TopcisTelescop.UPDATE_COMMIT, "file = " + data.file+ " need to update a commit");
    logger.debug(TopcisTelescop.UPDATE_COMMIT, "commit= "+ data.commit + " new message " + data.commitMessage );
    var dbObject = tracksDao.findByPath(data.file);
    if(dbObject){
        var commitToChange = dbObject.cids.filter((e) => {return e.hash === data.commit})[0];
        commitToChange.commitMessage = data.commitMessage;
        if(commitToChange.hash === dbObject.latestCid.hash){
            dbObject.latestCid = commitToChange;
        }
    }
    tracksDao.update(dbObject);
    event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"Commit " + data.commit.substring(0, 10) + " commit message updated !" , level:"success", autoDismiss:2}));
}