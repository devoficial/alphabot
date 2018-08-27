'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;


class SlackClient{
    constructor(token,logLevel,nlp){
        this._rtm = new RtmClient(token,{logLevel: logLevel});
        this._nlp = nlp;

        this._addAuthenticatedHandler(this._handleAuthenticated);
        this._rtm.on(RTM_EVENTS.MESSAGE, this._handleOnMessage.bind(this));
    }
    _handleAuthenticated(rtmStartData){
        console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
    }
    _addAuthenticatedHandler(handler) {
        this._rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler.bind(this));
    }
    _handleOnMessage(message) {
        if(message.text.toLowerCase().includes('alpha')){
            this._nlp.ask(message.text,(err,res) => {
                if(err){
                    console.log(err);
                    return;
                }
                console.log(res);

                try{
                    if(!res.intent || !res.intent[0] || !res.intent[0].value){
                        throw new Error('Could not extract intent');
                    }
                    const intent = require('./intents/'+ res.intent[0].value +'intents');
    
                    intent.process(res, (error, response) =>{
                        if(error){
                            console.log(error.message);
                            return;
                        }
    
                        return this._rtm.sendMessage(response,message.channel);
                    });
                }catch(err){
                    console.log(err);
                    console.log(res);
                    this._rtm.sendMessage('I dont know what you are talking about', message.channel);
                }
            });
        }
        
    }
    start(handler){
        this._addAuthenticatedHandler(handler);
        this._rtm.start();
    }
}


module.exports = SlackClient;