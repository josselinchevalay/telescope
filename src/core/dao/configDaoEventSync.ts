import {IDao}   from './idao'
const {ipcRenderer} = require('electron')

export default class ConfigDaoEventSync implements IDao<any> {

    public getAll(): Array<any> {
        throw new Error('not implemented');
    }
    public findById(id: number): any {
        return ipcRenderer.sendSync('SYNC-DB-CONFIG-GET', {});
    }
    public update(object: any) {
        return ipcRenderer.sendSync('SYNC-DB-CONFIG-UPDATE', object);
    }
    public remove(object: any) {
        
    }
}
