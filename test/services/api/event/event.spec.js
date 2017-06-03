const expect = require('chai').expect; 
const { ipcRenderer, ipcMain } = require('electron-ipc-mock')();
const EventService = require('../../../../src/services/api/event');

describe('Service/api/event',() => {
  describe('initialize', () => {
    it('success', () =>{
        const instance = EventService(ipcMain);
        expect(instance).not.empty;
    });
    it('fail', ()=>{
        const instance = EventService();
        expect(instance).to.null;
    });
  });
  describe('addTopic', () =>{
      it('add topics and listener', () =>{
          const instance = EventService(ipcMain);
          var topic = "/ipfs/document/add";
          var hand = (data) => {console.log(data);};
          var ret = instance.addTopic(topic, hand);
          expect(ret).to.eql(topic);
      });
      it('add bad topic', () =>{
          const instance = EventService(ipcMain);
          var ret = instance.addTopic();
          expect(ret).to.null;
      });
      it('add multiple handlers on topics', () =>{
          const instance = EventService(ipcMain);
          var topic = "/ipfs/document/add";
          var hand1 = (data) => {console.log(data);};
          var hand2 =  (data) => {data.test = true;};
          var ret = instance.addTopic(topic, hand1);
          ret = instance.addTopic(topic, hand2);
          expect(ret).to.eql(topic);
      });
  });
  describe('removeTopic', () => {
      it('success', () => {
          const instance = EventService(ipcMain);
          var topic = "/ipfs/document/add";
          var hand1 = (data) => {console.log(data);};
          var ret = instance.addTopic(topic, hand1);
          var top = instance.removeTopic(ret);
          expect(top).to.eql(topic);
      });
      it('no topic', () => {
          const instance = EventService(ipcMain);
          var top = instance.removeTopic();
          expect(top).to.null;
      });
  });
});