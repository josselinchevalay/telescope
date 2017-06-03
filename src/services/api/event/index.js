export default class EventService {

    constructor(ipc) {
        if(!ipc){
            return null;
        }
        this.ipc = ipc;
        this.topics = {};
        this.hOP = this.topics.hasOwnProperty;
    }

    updateIpc(){
        for(var topic in this.topics){
            this.ipc.removeAllListeners(topic);
            var handlers = this.topics[topic];
            handlers.forEach((handler) =>{
                this.ipc.on(topic,handler);
            });
        }
        return true;
    }   

    addTopic(topic, handler){
           if(!topic || !handler ){
                return null;
           }
            // Create the topic's object if not yet created
            if(!this.hOP.call(this.topics, topic)) this.topics[topic] = [];
            var index = this.topics[topic].push(handler) -1;
            if(this.updateIpc())
                return topic;
       }

    removeTopic(topic){
           if(!topic)
            return null;
           delete this.topics[topic];
           if(this.updateIpc())
            return topic;
       }
};