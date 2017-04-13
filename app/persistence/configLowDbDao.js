module.exports = function(lowDbProvider) {
    this.provider = lowDbProvider;
    this.CONFIG = 'config';

    this.get = (params) => {
        return this.provider.get((params) ? this.CONFIG + "." + params : this.CONFIG).value();
    };

    this.set = (params, value) => {
        return this.provider.set(this.CONFIG + "." + params, value).write();
    };
};