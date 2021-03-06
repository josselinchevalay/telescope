import EventService from '../index';
import Topics from './topics';
import LoggerService from '../../../logger';
import AddDocumentHandler from './handlers/addDocumentHandler';

const logger = new LoggerService();
logger.level = "debug";
export default class IpfsEventService {

    constructor(ipc, ipfsApi) {
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;

        this.handlers = {
            "ipfs/document/add": AddDocumentHandler.bind(this),
            "ipfs/config/get": (event, data) => {
                this.ipfsApi.config.get((err, config) => {
                    event.returnValue = JSON.stringify(config);
                })
            }
        }
        this.initialize();
    };

    initialize() {
        for (var topic in this.handlers) {
            this.eventService.addTopic(topic, this.handlers[topic]);
        }
    };

}