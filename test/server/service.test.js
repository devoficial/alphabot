'use strict'

const should = require('should');
const request = require('supertest');
const service = require('../../server/service');


describe('The express service', () => {
    describe('GET /foo', () => {
        it('should return http 404',(done) => {
            request(service)
            .get('/foo')
            .expect(404,done);
        });
    });
    describe('GET /service/:location', () => {
        it('should return http 200 and reply with a valid result',(done) => {
            request(service)
            .get('/service/berlin')
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                res.body.result.should.exist;
                return done();
            })
        });
    });
});