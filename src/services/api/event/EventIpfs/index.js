import EventService from '../index';
import Topics from './topics';
import LoggerService from '../../../logger';
import AddDocumentHandler from './handlers/addDocumentHandler';

const logger = new LoggerService();
logger.level = "debug";
export default class IpfsEventService {

    constructor(ipc, ipfsApi) {
        console.log(ipfsApi);
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;

        this.handlers = {
            "ipfs/document/add": AddDocumentHandler.bind(this),
            "ipfs/config/get": (event, data) => {
                logger.debug("ipfs/config/get");
                this.ipfsApi.config.get((err, config) => {
                    var config = JSON.parse(config);
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