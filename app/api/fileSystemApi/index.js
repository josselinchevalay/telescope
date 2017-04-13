const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');


var fsAPI = function() {
    'use strict';

    this.exist = (filePath) => {
        if (this.isPath(filePath))
            return fs.existsSync(filePath);
        else
            return false;
    };

    this.isPath = (filePath) => {
        if (filePath === '' ||
            filePath === null ||
            filePath === undefined ||
            typeof filePath === "number"
        ) {
            return false;
        } else {
            return filePath.indexOf(path.sep) > -1;
        }
    };

    this.getStat = (filePath) => {
        return fs.statSync(filePath);
    };

    this.getBuffer = (filePath) => {
        return fs.readFileSync(filePath);
    };

    this.getStream = (filePath) => {
        return fs.createReadStream(filePath);
    };

    this.createFileByBuffer = (filePath, buffer) => {
        if (this.isPath(filePath)) {
            fs.writeFileSync(filePath, buffer);
            if (fs.existsSync(filePath))
                return true;
            else return false;
        } else {
            return false;
        }
    };

    this.createFileByStream = (filePath, buffer) => {
        return new Promise((resolver, reject) => {
            if (this.isPath(filePath)) {
                fs.writeFile(filePath, buffer, (err, data) => {
                    if (err)
                        reject(err);
                    if (fs.existsSync(filePath))
                        resolver(true);
                    else
                        reject(false);
                });
            } else {
                reject(false);
            }
        });
    };

    this.removeFile = (filePath) => {
        if (this.exist(filePath)) {
            fs.unlinkSync(filePath);
            if (!this.exist(filePath))
                return true;
            else
                return false;
        } else {
            return false;
        }
    };

    this.removeDir = (filePath) => {
        if (this.exist(filePath)) {
            return fs.rmdirSync(filePath);
        } else {
            return false;
        }
    };

    this.mkdirp = (filePath, data) => {
        return new Promise((resolver, reject) => {
            if (!this.isPath(filePath))
                reject(false);
            var dirPath = filePath.split(path.sep).splice(0, filePath.split(path.sep).length - 1).join(path.sep);
            if (this.exist(dirPath) && this.exist(filePath)) {
                resolver();
            } else if (!this.exist(dirPath)) {
                mkdirp(dirPath, (err) => {
                    if (err) reject(err);
                    this.createFileByBuffer(filePath, data);
                    if (this.exist(filePath))
                        resolver();
                });
            } else {
                this.createFileByBuffer(filePath, data);
                if (this.exist(filePath))
                    resolver();
            }

        });


        /*return new Promise((resolver, reject) => {
            if (this.exist(filePath))
                reject({});

            mkdirp(filePath, (err) => {
                if (err) reject(err);
                resolver();
            });
        });*/
    };
};

module.exports = new fsAPI();