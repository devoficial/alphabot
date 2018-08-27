require('dotenv').config();
const bunyan = require('bunyan');

const log = {
    development:()=>{
        return bunyan.createLogger({name:'ALPHA-development',level:'debug'});
    },
    production:() =>{
        return bunyan.createLogger({name:'ALPHA-production',level:'info'});
    },
    test:()=>{
        return bunyan.createLogger({name:'ALPHA-test', level:'fatal'});
    }
};

module.exports = {
    witToken:process.env.WIT_TOKEN,
    slackToken:process.env.SLACK_TOKEN,
    googleApiKey:process.env.GOOGLE_TIME_API_KEY,
    slackLogLevel:'verbose',
    log:(env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};