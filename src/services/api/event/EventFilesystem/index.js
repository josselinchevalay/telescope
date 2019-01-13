import EventService from '../index';
import Topics from './topics';
import LoggerService from '../../../logger';

import GetExtensionHandler from './handlers/getExtensionHandlers';

const logger = new LoggerService();
logger.level = "debug";
export default class IpfsEventService {

    constructor(ipc, ipfsApi) {
        this.eventService = new EventService(ipc);
        this.ipfsApi = ipfsApi;

        this.handlers = {
          "fs/get/extension": GetExtensionHandler.bind(this)
        }
        this.initialize();
    };

    initialize() {
        for (var topic in this.handlers) {
            this.eventService.addTopic(topic, this.handlers[topic]);
        }
    };

}
