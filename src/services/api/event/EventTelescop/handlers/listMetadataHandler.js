import LoggerService from '../../../../logger';
import TopcisTelescop from '../topics';
import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';

const logger = new LoggerService();
const _ = require('lodash');
const Path = require("path");
logger.level = "debug";


export default function(event, data){
	"use strict";
	var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var tracksDao = provider.gettracksDao(connection);
    logger.debug(TopcisTelescop.LIST_METADATA, "data = ", data);
    let track = tracksDao.findByPath(data);
    if(track){
    	logger.debug(TopcisTelescop.LIST_METADATA, track.path + " founded");
    	let metadata = (track.metadata) ? track.metadata : {};
    	event.returnValue = JSON.stringify(metadata);
    }
    event.returnValue = JSON.stringify({});
}