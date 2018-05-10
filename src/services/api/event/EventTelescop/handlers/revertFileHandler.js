import LoggerService from '../../../../logger';
import TopcisTelescop from '../topics';
import FileSystemApi from '../../../fileSystemApi';
import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';

const logger = new LoggerService();
const _ = require('lodash');
const Path = require("path");
logger.level = "debug";


function getRessourceByhash(ipfsApi, path, hash){
    let stream = ipfsApi.files.getReadableStream(hash);
    stream.on('data', (file) => {
        var tempPath = path;
        // write the file's path and contents to standard out
        if(file.content){    
            var tabIpfsPath =  file.path.split('/');
            var ipfsHash = tabIpfsPath[0];        
            var ipfsPath = _.without(tabIpfsPath, ipfsHash).join(Path.sep)
            if(file.type === "dir"){ // is directory
                tempPath = Path.join(path, ipfsPath);
            }else{                  
                file.content.on('data', (content)=>{
                    FileSystemApi.removeFile(tempPath);
                    FileSystemApi.createFileByBuffer(tempPath, content);
                });
                file.content.resume();
            }
        }              
    })

}

function updateTrack(track, commit){
    track.checksum = commit.checksum;
    track.latestCid = commit;
    return track;
}

export default function(event, data){
    "use strict";
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var tracksDao = provider.gettracksDao(connection);
    logger.debug(TopcisTelescop.REVERT_FILE, "data = ", data);
    var data = JSON.parse(data);
    var dbObject = tracksDao.findByPath(data.file);
    var currentCheckSum = FileSystemApi.checksum(data.file);
    if(dbObject.checksum === currentCheckSum){
        logger.debug(TopcisTelescop.REVERT_FILE, "file " + data.file + " has a checksum manage by telescop");
        var commit = dbObject.cids.filter((e) => {return e.hash === data.commit})[0];
        getRessourceByhash(this.ipfsApi, data.file, data.commit);
        tracksDao.update(updateTrack(dbObject, commit));
        event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"Your local file(s) reverted to " + data.commit.substring(0, 10), level:"success", autoDismiss:2}));
    }else{
        logger.debug(TopcisTelescop.REVERT_FILE, "warning" ,"file" + data.file + " need to reach on old cids ...");
        var commitFindByChecksum = dbObject.cids.filter((e) => { return e.checksum === currentCheckSum});
        if(commitFindByChecksum.length === 1){
            getRessourceByhash(this.ipfsApi, data.file, data.commit);
            tracksDao.update(updateTrack(dbObject, commitFindByChecksum[0]));
            event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"Your local file(s) reverted to " + data.commit.substring(0, 10), level:"success", autoDismiss:2}));
        }else{
            event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({message:"You cannot revert your file " +data.path + " is under untrack state " + data.commit.substring(0, 10), level:"error", autoDismiss:2}));
        }
    }
      
}
