import LoggerService from '../../../../logger'
import FileSystemApi from '../../../fileSystemApi';
import TopcisTelescop from '../topics';
import PersistenceFactory  from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';


const logger = new LoggerService();
logger.level = "debug";
const _ = require('lodash');

function checkisRoot(path, paths){
     var parents = paths.filter((p) => { return FileSystemApi.parent(path, p) === -1;});
     if(parents.length == 0 ){
         return true;
     }else {
        return false;
     }     
}

function reachChildByPath(tracks, path){
     var directories = tracks.filter((element) => {
         if(path !== "")
            return element.type === "os/directory" && FileSystemApi.parent(path , element.path) === 1;
        else
         return element.type === "os/directory" && checkisRoot(element.path , tracks.map((e) => {return e.path;}));
    });
    var pathDirParent = directories.map((element) => {
        return element.path;
    });
    //console.log(pathDirParent);
    var allfilesWithoutDirectory =  _.without(tracks.filter((e) =>{
        if(path !=="")
            return _.includes(e.path, path) && e.type !== "os/directory";
        else
            return true;
    }), directories);
    var allFilesWithoutParent = allfilesWithoutDirectory.filter((element) => {
            if(pathDirParent.length > 0)
                return ! _.includes(element.path, pathDirParent);
            else
                return true;
    });
    //console.log(directories);
    return [].concat(directories, allFilesWithoutParent);
}

export default function(event, data){
    "use strict";
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection  = provider.createConnection(provider.DBPATH);
    var tracksDao = provider.gettracksDao(connection);
    var allTracks = tracksDao.get() || [];
    logger.debug(TopcisTelescop.GET_FILES, "data = ", data);
    event.returnValue =JSON.stringify(reachChildByPath(allTracks, data));
};