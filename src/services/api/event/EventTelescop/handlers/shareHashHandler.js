import LoggerService from '../../../../logger';
import TopcisTelescop from '../topics';
import NotificationTopics from '../../EventNotification/topics';

const {clipboard} = require('electron'); 
const logger = new LoggerService();
logger.level = "debug";

export default function(event, data){
    "use strict";
    logger.debug(TopcisTelescop.SHARE_IPFS, "data = ", data);
    var url = "https://ipfs.io/ipfs/" + data;
    clipboard.writeText(url, 'ipfsAddress')
    event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"Ipfs address add in your clipboard !", level:"success", autoDismiss:2}));
}