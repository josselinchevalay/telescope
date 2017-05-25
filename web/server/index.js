
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const FileSystemApi = require('../../app/api/fileSystemApi');
const PersistenceFactory = require('../../app/persistence/persistenceFactory.js');
const lowDBProvider = require('../../app/persistence/lowdbProvider.js');
const IPFS = require('ipfs');

const provider = PersistenceFactory.getPorvider(PersistenceFactory.LOWDB);
const connection = provider.createConnection(provider.DBPATH);


const node = new IPFS();
let isRun = false;




node.on('ready', () => {
    // Your now is ready to use \o/
    isRun = true;
    // stopping a node
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/run', (req, res)=>{
        res.send({run:isRun});
    });

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/config', (req, res) => {
        var configDao = provider.getConfigDao(connection);
        var config = configDao.get();
        console.log("get config : %s", config);
        res.send(config);
    });

    app.post('/config', (req, resp)=>{
        var configDao = provider.getConfigDao(connection);
        console.log(req.body.config);
        configDao.set("",req.body.config);
        resp.sendStatus(200);
    });

    app.listen(3001, function () {
        console.log('Example app listening on port 3001!');
    });
});

