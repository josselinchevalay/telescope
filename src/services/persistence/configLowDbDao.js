export default class ConfigLowDbDao {

    constructor(lowDbProvider){
        this.provider = lowDbProvider;
        this.CONFIG = 'config';
    }

    get(params){
        return this.provider.get((params !=="") ? this.CONFIG + "." + params : this.CONFIG).value();
    }

    set(params, value){
        return this.provider.set((params !== "") ? this.CONFIG + "." + params : this.CONFIG, value).write();
    }
}