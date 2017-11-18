import LoggerService from '../../../../logger';
import TopcisTelescop from '../topics';
import NotificationTopics from '../../EventNotification/topics';
import PersistenceFactory  from '../../../../persistence/persistenceFactory';

const {clipboard} = require('electron');
const _ = require('lodash');
const logger = new LoggerService();
logger.level = "debug";

export default function(event, data){
    "use strict";
    logger.debug(TopcisTelescop.SHARE_IPFS, "data = ", data);
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var tracksDao = provider.gettracksDao(connection);
    var track = tracksDao.findByPath(data);
    var url = "https://ipfs.io/ipfs/" + track.latestCid.hash;
    clipboard.writeText(url, 'ipfsAddress')
    event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"Ipfs address add in your clipboard !", level:"success", autoDismiss:2}));
}