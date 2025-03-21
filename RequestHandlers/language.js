var mongoose = require('mongoose');
var moment = require('../public/js/libs/moment/moment');

var Nationality = function (event, models) {
    'use strict';

    var LanguageSchema = mongoose.Schemas.language;

    var LanguagesService = require('../services/language')(models);

    function checkNameUniq(req, model, modelSchema, callback) {
        var Model = models.get(req.session.lastDb, model, modelSchema);
        var response;

        Model.findOne({name: req.body.name}).exec(function (err, doc) {
            if (err) {
                return callback(err);
            }

            doc ? response = false : response = true;

            return callback(null, response);
        });
    }

    this.get = function (req, res, next) {
        var dbName = req.session.lastDb;

        LanguagesService.get({dbName: dbName}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        });
    };

    this.create = function (req, res, next) {
        var dbName = req.session.lastDb;
        var body = req.body;

        body.dbName = dbName;
        checkNameUniq(req, 'language', LanguageSchema, function (err, resp) {
            if (err) {
                return next(err);
            }
            if (resp) {
                LanguagesService.create(body, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(201).send(result);
                });
            } else {
                err = new Error('Name already is exist');
                err.status = 400;

                return next(err);
            }
        });
    };

    this.update = function (req, res, next) {
        var dbName = req.session.lastDb;
        var body = req.body;
        var id = req.params.id;

        checkNameUniq(req, 'language', LanguageSchema, function (err, resp) {
            if (err) {
                return next(err);
            }
            if (resp) {
                LanguagesService.findByIdAndUpdate(id, body, {dbName: dbName}, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(201).send(result);
                });
            } else {
                err = new Error('Name already is exist');
                err.status = 400;

                return next(err);
            }
        });
    };

    this.remove = function (req, res, next) {
        var dbName = req.session.lastDb;
        var _id = req.params.id;

        LanguagesService.findByIdAndRemove({_id: _id, dbName: dbName}, function (err, model) {
            if (err) {
                return next(err);
            }

            res.status(200).send({success: 'Language was removed successfully', model: model});
        });
    };

};

module.exports = Nationality;
