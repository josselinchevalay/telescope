import EventService from '../index';
import LoggerService from '../../../logger';
import getAllFilesHandler from './handlers/getAllFilesHandler';

const logger = new LoggerService();
logger.level = "debug";
export default class IpfsEventService {

    constructor(ipc, ipfsApi){
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;

        this.handlers = {
            "telescop/file/all" : getAllFilesHandler.bind(this)
        }
        this.initialize();
    };

    initialize(){
       for(var topic in this.handlers){
           this.eventService.addTopic(topic, this.handlers[topic]);
       }
    };

}