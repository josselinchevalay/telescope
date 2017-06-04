import EventService from '../index';
import Topics from './topics';
import SetConfigHandler from './handlers/setConfigHandler';
import GetConfigHandler from './handlers/getConfigHandler';

export default class IpfsEventService {

    constructor(ipc, ipfsApi){
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;
        

        this.handlers = {
            "telescop/config/set" : SetConfigHandler,
            "telescop/config/get" : GetConfigHandler
        }
        this.initialize();
    };

    initialize(){
       for(var topic in this.handlers){
           this.eventService.addTopic(topic, this.handlers[topic]);
       }
    };

}