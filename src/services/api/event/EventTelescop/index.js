import EventService from '../index';
import LoggerService from '../../../logger';
import getAllFilesHandler from './handlers/getAllFilesHandler';
import shareHashHandler from './handlers/shareHashHandler';
import UpdateCommitHandler from './handlers/updateCommitHandler';
import RevertFileHandler from './handlers/revertFileHandler';
import ListMetadataHandler from './handlers/listMetadataHandler';

const logger = new LoggerService();
logger.level = "debug";

export default class IpfsEventService {

    constructor(ipc, ipfsApi){
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;

        this.handlers = {
            "telescop/file/all" : getAllFilesHandler.bind(this),
            "telescop/ipfs/share" : shareHashHandler.bind(this),
            "telescop/tracks/commit/update" : UpdateCommitHandler.bind(this),
            "telescop/file/revert" : RevertFileHandler.bind(this),
            "telescop/metadata/list" : ListMetadataHandler.bind(this),
        }
        this.initialize();
    };

    initialize(){
       for(var topic in this.handlers){
           this.eventService.addTopic(topic, this.handlers[topic]);
       }
    };

}