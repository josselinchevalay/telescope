import LoggerService from '../../../../logger'
import FileSystemApi from '../../../fileSystemApi';

const logger = new LoggerService();
logger.level = "debug";
const IpcMain = require("electron").ipcMain;

export default function (event, data) {
  "use strict";
  logger.debug("fs/get/extension = " + data );
  event.returnValue = JSON.stringify(FileSystemApi.getExtension(data));
}
