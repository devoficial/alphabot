'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);
 


const witToken = 'X2ON5I54246ZPI65CYL2TJM6ICHFN2VW';
const slackToken = 'xoxb-420539674774-418975274276-W7fgOXVIZXUUGYwsWVLeBqBU';


const slackLogLevel = 'verbose';

const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel,witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3010));

server.on('listening', function() {
    console.log(`Alphabot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});