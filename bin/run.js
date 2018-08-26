'use strict';

const config = require('../config');
const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);


const witToken = config.witToken;
const slackToken = config.slackToken;


const slackLogLevel = 'verbose';

const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel,witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3010));

server.on('listening', function() {
    console.log(`Alphabot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});