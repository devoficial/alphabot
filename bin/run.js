'use strict';
const config = require('../config');
const log = config.log();
const SlackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);


const witToken = config.witToken;
const slackToken = config.slackToken;

const WitClient = require('../server/witClient');
const witClient = new WitClient(witToken);

const slackClient = new SlackClient(slackToken, config.slackLogLevel,witClient,log);
slackClient.start(() => {
    server.listen(3010);
});

server.on('listening', ()=> {
    log.info(`Alphabot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});