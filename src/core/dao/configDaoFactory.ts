import {PERSISTENCE_MODE, IDaoFactory} from './idaoFactory'
import {IDao} from './idao'
import ConfigDaoEventSync from './configDaoEventSync'

export default class ConfigDaoFactory implements IDaoFactory<IDao<any>>{
    private static _instance : ConfigDaoFactory = new ConfigDaoFactory();

    constructor() {
        if(ConfigDaoFactory._instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        ConfigDaoFactory._instance = this;
    }

    public static getInstance():ConfigDaoFactory
    {
        return ConfigDaoFactory._instance;
    }

    public getDao(mode: PERSISTENCE_MODE) : IDao<any> {
        switch(mode){
            case PERSISTENCE_MODE.EVENT_SYNC : 
                return new ConfigDaoEventSync();
        }
    }
}