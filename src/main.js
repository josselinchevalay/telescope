import Telescope from './telescope';
import IpfsTopics from './services/api/event/EventIpfs/topics';

const {ipcRenderer} = require('electron');

/*ipcRenderer.on(IpfsTopics.CONFIG_GET_RESPONSE, (event, arg) => {
  console.log(JSON.parse(arg)) 
});*/

//ipcRenderer.send(IpfsTopics.CONFIG_GET, '');
console.log(JSON.parse(ipcRenderer.sendSync(IpfsTopics.CONFIG_GET, '')));
let telescope = new Telescope();
telescope.initialize();

