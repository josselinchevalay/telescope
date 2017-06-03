module.exports = function(lowDbProvider) {
    this.provider = lowDbProvider;
    this.TRACKS = 'tracks';

    this.initialize = () => {
        if (this.provider.has(this.TRACKS).value() === false)
            this.provider.set(this.TRACKS, []).write();
    };

    this.get = () => {
        this.initialize();
        return this.provider.get(this.TRACKS).value();
    };

    this.findById = (id) => {
        this.initialize();
        return this.provider.get(this.TRACKS).find({ _id: id }).value();
    };

    this.create = (entity) => {
        this.initialize();
        return this.provider.get(this.TRACKS).push(entity).write();
    };

    this.update = (entity) => {
        this.initialize();
        return this.provider.get(this.TRACKS).find({ _id: entity._id }).assign(entity).write();
    };
};