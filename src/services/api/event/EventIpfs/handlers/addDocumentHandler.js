import LoggerService from '../../../../logger'
import FileSystemApi from '../../../fileSystemApi';
import PersistenceFactory from '../../../../persistence/persistenceFactory';
import NotificationTopics from '../../EventNotification/topics';

const logger = new LoggerService();
logger.level = "debug";
const IpcMain = require("electron").ipcMain;

function createTrack(file, ipfsInformation, commitMessage) {
    var timestamp = Date.now();
    var entity = {};
    var ressource = {};
    ressource.parent = ipfsInformation.hash;
    ressource.commitMessage = commitMessage;
    ressource.createdAt = timestamp;
    ressource.hash = ipfsInformation.hash;
    ressource.checksum = file.checksum;
    ressource.size = ipfsInformation.size;
    entity = file;
    entity.addedAt = timestamp;
    entity.cids = [];
    entity.latestCid = ressource;
    entity.cids.push(ressource);
    entity.meta = {};
    return entity;
}

function updateTrack(file, track, ipfsInformation, commitMessage) {
    var timestamp = Date.now();
    var ressource = {};
    ressource.parent = track.latestCid.hash;
    ressource.commitMessage = commitMessage;
    ressource.createdAt = timestamp;
    ressource.hash = ipfsInformation.hash;
    ressource.checksum = file.checksum;
    ressource.size = ipfsInformation.size;
    track.cids.push(ressource);
    track.latestCid = ressource;
    track.checksum = file.checksum;
    track.size = file.size;
    return track;
}

function bindFileInfo(ressources, file) {
    var fileOsInfo = FileSystemApi.getStat(file.path);
    fileOsInfo.type = FileSystemApi.getMimeType(file.path);
    file.checksum = FileSystemApi.checksum(file.path);
    if (!file.lastlastModified) {
        file.lastlastModified = new Date(fileOsInfo.mtime).getTime()
    }
    if (!file.size) {
        file.size = fileOsInfo.size;
    }
    if (!file.type) {
        file.type = fileOsInfo.type || "os/directory";
    }
    if (FileSystemApi.isDirectory(file.path)) {
        FileSystemApi.readDir(file.path).forEach((c) => {
            var child = { path: file.path + "/" + c, name: c };
            bindFileInfo(ressources, child);
        });
    } else {
        file.content = FileSystemApi.getBuffer(file.path);
    }
    ressources.push(file);
}

function addOnIpfs(event, ressources, ipfsApi) {
    var provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
    var connection = provider.createConnection(provider.DBPATH);
    var tracksDao = provider.gettracksDao(connection);
    var files = ressources.filter((element) => {
        return element.type !== "os/directory";
    });
    ipfsApi.files.add(files, (error, response) => {
        console.log(response);
        ressources.forEach((ressource) => {
            if (error) {
                var message = "ipfs/document/add ressource" + ressource.path + "doesn't add to ipfs error code : " + error.code;
                logger.error(message, JSON.stringify(error));
                event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({ message: message, level: "error", autoDismiss: 2 }));
                return;
            }
            if (ressource.content) {
                delete ressource.content;
            }
            logger.debug("ipfs/document/add ressource = ", JSON.stringify(ressource));
            var ipfsInformation = response.filter((element) => {
                if (ressource.type === "os/directory") {
                    return "/" + element.path === ressource.path;
                } else {
                    return element.path === ressource.path;
                }
            })[0]; /// first element where path is the same
            var track = tracksDao.findByPath(ressource.path);
            if (track) {
                logger.debug("ipfs/document/add ressource", ressource.path, " exist");
                var cids = track.cids.filter((element) => {
                    return element.hash === ipfsInformation.hash;
                });
                if (cids.length > 0) {
                    logger.debug("ipfs/document/add ressource", ressource.path, " already tracked");
                    event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({ message: "Ressource : " + ressource.path + " already exist on ipfs !", level: "warning", autoDismiss: 2 }));
                } else {
                    var entity = updateTrack(ressource, track, ipfsInformation, ipfsInformation.hash);
                    tracksDao.update(entity);
                    logger.debug("ipfs/document/add ressource", ressource.path, " updated");
                    event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({ message: "Ressource : " + ressource.path + " synchronized on ipfs !", level: "success", autoDismiss: 2 }));
                    event.sender.send(NotificationTopics.REFRESH_FILES, JSON.stringify({ "refresh": "files" }));
                }

            } else {
                logger.debug("ipfs/document/add ressource", ressource.path, " not exist");
                var entity = createTrack(ressource, ipfsInformation, "First commit");
                tracksDao.create(entity);
                event.sender.send(NotificationTopics.NOTIFICATION, JSON.stringify({ message: "Document : " + ressource.path + " added on ipfs !", level: "success", autoDismiss: 2 }));
                event.sender.send(NotificationTopics.REFRESH_FILES, JSON.stringify({ "refresh": "files" }));
            }
        });
    });
}

export default function (event, data) {
    "use strict";
    logger.debug("ipfs/document/add data = ", data);
    var files = JSON.parse(data);
    var ressources = [];
    files.forEach((f) => {
        var file = JSON.parse(f);
        bindFileInfo(ressources, file);
        logger.debug("ipfs/document/add number of ressources %d", ressources.length);
        addOnIpfs(event, ressources, this.ipfsApi);
    });
    event.returnValue = 'pong';
};