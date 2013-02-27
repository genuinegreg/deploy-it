'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
    creation: { type: Date, 'default': Date.now },
    users: [
        {
            username: String,
            password: String
        }
    ]
});


var AppSchema = new Schema({
    upload: { type: Date, 'default': Date.now },
    hash: String,
    name: String,
    version: Number,
    type: String
});

exports = {
    AccountSchema: AccountSchema,
    AppSchema: AppSchema
};
