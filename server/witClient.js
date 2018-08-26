'use strict'
const request = require('superagent');

function handleWitRes(res){
    return res.entities;
}
module.exports = function witClient(token){
    const ask = function ask(message, cb){

        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + token)
            .query({v: '20180820'})
            .query({q: message})
            .end((err,res) => {
                if(err) return cb(err);
                
                if(res.statusCode !== 200) return cb('expected status 200 but got : ' + res.statusCode);
                const witRes = handleWitRes(res.body);
                return cb(null, witRes);
            })        
    }
    return {
        ask: ask,
    }
}