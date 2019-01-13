const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const crypto = require('crypto');
const mime = require('mime-types')
const _ = require('lodash');
const FileType = require('file-type');

var fsAPI = function() {
    'use strict';

    this.exist = (filePath) => {
        if (this.isPath(filePath))
            return fs.existsSync(filePath);
        else
            return false;
    };

    this.getFilename = (filePath) =>{
        if(this.isPath(filePath)){
            return path.basename(filePath);
        }else{
            return false;
        }
    }

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

    this.isDirectory = (filePath) =>{
        if(this.exist(filePath)){
            return this.getStat(filePath).isDirectory();
        }else{
            return false;
        }
    };

    this.basename = (filePath) =>{
        if(this.isPath(filePath))
            return path.basename(filePath);
        else
            return false;
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
    };

    this.checksumFile = (filePath) => {
        if (this.exist(filePath)) {
            return this._checksum(fs.readFileSync(filePath), 'sha256');
        }else {
            return false;
        }
    };

    this.getMimeType = (filePath) => {
        return mime.lookup(filePath);
    }

    this.checksumDirectory = (filePath) => {
        var hashTree = "";
        var children = fs.readdirSync(filePath);
        children.forEach((child)=>{
            var childpath  = path.join(filePath, child);
            if(this.isDirectory(childpath)){
                hashTree =  hashTree + this.checksumDirectory(childpath);
            }else{
                hashTree = hashTree + this.checksumFile(childpath);
            }
        });
        return this._checksum(hashTree);
    }

    this.readDir = (filePath) =>{
        if(this.isDirectory(filePath)){
            return fs.readdirSync(filePath);
        }else{
            return false;
        }
    }

    this.checksum = (filePath) => {
        if(this.exist(filePath)){
            if(this.isDirectory(filePath)){
                return this.checksumDirectory(filePath);
            }else{
                return this.checksumFile(filePath);
            }
        }else{
            return false;
        }
    }

    this._checksum = (str, algorithm, encoding) => {
        return crypto
            .createHash(algorithm || 'md5')
            .update(str, 'utf8')
            .digest(encoding || 'hex')
    }

    this.parent = (path1, path2) => {
        if(path1 === path2)
            return -99;
        var longest = (path1 > path2) ? path1 : path2;
        var minest = (path1 < path2) ? path1  : path2;
        if(_.includes(longest, minest)){
            if(path1.length < path2.length)
            return 1;
            else
            return -1;
        }else{
            return 0;
        }
    }

    this.getExtension = (p) => {
      if(this.isDirectory(p)){
        return {ext : "directory", mime: "application/directory"};
      } else {
        let type = FileType(fs.readFileSync(p));
        if(type === null) {
          let extension = path.extname(p).toString().replace('.', '');
          return { ext: extension, mime: "application/"+ extension};
        }
      }
    }

};

module.exports = new fsAPI();
