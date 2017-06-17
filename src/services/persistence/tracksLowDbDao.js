export default class TracksLowDbDao {

    constructor(lowDbProvider) {
        this.provider = lowDbProvider;
        this.TRACKS = 'tracks';
    }

    initialize(){
        if (this.provider.has(this.TRACKS).value() === false)
            this.provider.set(this.TRACKS, []).write();
    }

    get() {
        this.initialize();
        return this.provider.get(this.TRACKS).value();
    }

    findById(id){
        this.initialize();
        return this.provider.get(this.TRACKS).find({ _id: id }).value();
    }

    findByPath(path){
        this.initialize();
        return this.provider.get(this.TRACKS).find({path: path}).value();
    }

    create(entity){
        this.initialize();
        return this.provider.get(this.TRACKS).push(entity).write();
    }

    update(entity){
        this.initialize();
        return this.provider.get(this.TRACKS).find({ path: entity.path }).assign(entity).write();
    }
};