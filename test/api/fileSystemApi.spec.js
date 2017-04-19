const expect = require("chai").expect;
const path = require('path');
const FileSystemApi = require('../../app/api/fileSystemApi');

describe('fileSystemApi', () => {
    /**
     * constant for the test
     */
    const failPath = 'C:\toto\toto\toto.txt';
    const sucessPath = path.join(__dirname, 'fileSystemApi.spec.js');
    const successSyncPath = path.join(__dirname, 'hello-sync.txt');
    const successAsyncPath = path.join(__dirname, 'hello-async.txt');

    /**
     * exist section
     */
    describe('exist ', () => {
        it('exist', () => {
            expect(FileSystemApi.exist(sucessPath)).to.equals(true);
        });
        it('not exist', () => {
            expect(FileSystemApi.exist(successSyncPath)).to.equals(false);
        });
    });
    /**
     * baseName section
     */
    describe('baseName', () => {
        it('sucess', () =>{
            expect(FileSystemApi.basename(successSyncPath)).to.equal('hello-sync.txt');
        });
        it('fail', () =>{
            expect(FileSystemApi.basename(failPath)).to.equal(false);
        });
    });
    /**
     * section Method isPath
     */
    describe('is Path', () => {
        it('without with simple quote ', () => {
            var testPath = '';
            expect(FileSystemApi.isPath(testPath)).to.equals(false);
        });

        it('without with null ', () => {
            var testPath = null;
            expect(FileSystemApi.isPath(testPath)).to.equals(false);
        });

        it('without with undefined ', () => {
            expect(FileSystemApi.isPath(undefined)).to.equals(false);
        });

        it('with a bab params : int', () => {
            var testPath = 5;
            expect(FileSystemApi.isPath(testPath)).to.equals(false);
        });

        it('with a bab params : string', () => {
            var testPath = "toto";
            expect(FileSystemApi.isPath(testPath)).to.equals(false);
        });

        it('not exist', () => {
            expect(FileSystemApi.isPath(failPath)).to.equals(false);
        });

        it('exist', () => {
            expect(FileSystemApi.isPath(sucessPath)).to.equals(true);
        });
    });
    /**
     * create file section
     */
    describe('create file', () => {
        describe('synchronous', () => {
            it('without params', () => {
                expect(FileSystemApi.createFileByBuffer('', '')).to.equals(false);
            });

            it('without filePath', () => {
                expect(FileSystemApi.createFileByBuffer('', 'hello world !\n')).to.equals(false);
            });

            it('with bad filePath', () => {
                expect(FileSystemApi.createFileByBuffer(failPath, 'hello world !\n')).to.equals(false);
            });

            it('sucess', () => {
                expect(FileSystemApi.createFileByBuffer(successSyncPath, 'hello world !\n')).to.equals(true);
            });
        });

        describe('async', () => {
            it('without params', (done) => {
                FileSystemApi.createFileByStream('', '').catch((err) => {
                    done(err);
                });
            });

            it('without filePath', (done) => {
                FileSystemApi.createFileByStream('', 'hello world !\n').catch((err) => {
                    done(err);
                });
            });

            it('with bad filePath', (done) => {
                FileSystemApi.createFileByStream(failPath, 'hello world !\n').catch((err) => {
                    done(err);
                });
            });

            it('sucess', (done) => {
                FileSystemApi.createFileByStream(successAsyncPath, 'hello world !\n').then((data) => {
                    done();
                });
            });
        });

        /**
         * remove section
         */
        describe('remove file section', () => {
            describe('sync', () => {
                it('success', () => {
                    FileSystemApi.removeFile(successAsyncPath);
                    FileSystemApi.removeFile(successSyncPath);
                    expect(FileSystemApi.exist(successAsyncPath)).to.equals(false);
                    expect(FileSystemApi.exist(successSyncPath)).to.equals(false);
                });
            });
        });
    });
});