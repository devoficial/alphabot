'use strict';

require('should');
const config = require('../../config/index');
const WitClient = require('../../server/witClient');

describe('WitClient',() => {
    describe('ask', () => {
        it('should return a valid wit response' , (done) =>{
            const witClient = new WitClient(config.witToken);

            witClient.ask('what is the time in Berlin ? ' ,(err, res) =>{
                if(err) return done(err);

                res.intent[0].value.should.equal('time');
                res.location[0].value.should.equal('Berlin');
                
                
            });
            return done();
        });
    });
});

