var request = require('supertest');
var expect = require('chai').expect;
var url = 'http://localhost:8089/';
var aggent;

require('../../config/environment/development');

describe('PaymentMethod Specs', function () {
    'use strict';

    describe('PaymentMethod with admin', function () {

        before(function (done) {
            aggent = request.agent(url);
            aggent
                .post('users/login')
                .send({
                    login: 'superAdmin',
                    pass : '111111',
                    dbId : 'vasyadb'
                })
                .expect(200, done);
        });

        after(function (done) {
            aggent
                .get('logout')
                .expect(302, done);
        });

        it('should get PaymentMethod for Dd', function (done) {

            aggent
                .get('paymentMethod')
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object);
                    expect(body)
                        .to.have.property('data')
                        .and.to.be.instanceOf(Array);

                    done();
                });
        });

    });

    describe('PaymentMethod with no authorise', function () {

        it('should fail get PaymentMethod for Dd', function (done) {

            aggent
                .get('paymentMethod')
                .expect(404, done);
        });

    });
});

