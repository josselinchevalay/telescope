import EventService from '../index';
import Topics from './topics';
import LoggerService from '../../../logger'

const logger = new LoggerService();
logger.level = "debug";
export default class IpfsEventService {

    constructor(ipc, ipfsApi){
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;

        this.handlers = {
            "ipfs/document/add" : (event, data) => {
                logger.debug(JSON.parse(data).msg);
                event.returnValue = 'pong';
            },
            "ipfs/config/get" : (event, data) => {
                logger.debug("ipfs/config/get");
                this.ipfsApi.apiClient.config.get((err, config) => {
                    var config  =JSON.parse(config);
                    event.returnValue = JSON.stringify(config);
                    //event.sender.send("ipfs/config/get/response", JSON.stringify(config));
                })
            }
        }
        this.initialize();
    };

    initialize(){
       for(var topic in this.handlers){
           this.eventService.addTopic(topic, this.handlers[topic]);
       }
    };

}