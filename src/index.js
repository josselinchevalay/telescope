import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import IPFS from 'ipfs';
import IpfsEventService from './services/api/event/EventIpfs';
import TelescopConfigEventService from './services/api/event/EventConfig';
import TelecopEventService from './services/api/event/EventTelescop';
import Logger from './services/logger';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let node;
const isDevMode = process.execPath.match(/[\\/]electron/);
const logger = new Logger();
logger.level = 'debug';

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
  app.on('ready', (err, a) => {
    logger.debug('app ready');
    try{
      node = new IPFS()
      node.on('error', (error) =>{
        if(error.message.indexOf("mismatch version") > -1){
          logger.warn("Bad version of IPFS change version in ~/.jsipfs/version  5 to 6 or in you repository path");
          process.exit(1);
        }
        logger.error(error.message);
        process.exit(1);
      });
      node.on('ready', () => {
          node.id((err, id) => {
          if (err) {
            return console.log(err)
          }
          console.log(id)
          var eventIpfs = new IpfsEventService(ipcMain, node);
          var eventTelescopConfig = new TelescopConfigEventService(ipcMain, node);
          var eventTelescop = new TelecopEventService(ipcMain, node);
          logger.debug('ipfs daemon is started display  main windows');
          createWindow();
        });
      });
    }catch(e){
      logger.error(e);
      process.exit(1);
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    /*node.stopDaemon((err) => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });*/
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
//});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
