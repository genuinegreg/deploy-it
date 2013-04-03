'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ** Schema definition ************************************************************************************************
var AccountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    creation: { type: Date, 'default': Date.now },
    users: [
        {
            _id: {type: String, index: { unique: true }},
            password: String
        }
    ]
});

var AuthTokenSchema = new Schema({
    _id: String,
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    update: {type: Date, 'default': Date.now, index: { expires: '30d' }}
});

var SessionIdSchema = new Schema({
    _id: String,
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    update: {type: Date, 'default': Date.now, index: { expires: '40m' }}
});


var AppSchema = new Schema({
    _id: String,
    upload: { type: Date, 'default': Date.now },
    name: String,
    version: Number,
    type: String
});


// ** Db connection ************************************************************************************************
var ncf = require('../etc/nconfLoader');
mongoose.connect('mongodb://' + ncf.get('db:host') + '/' + ncf.get('db:database'));


// ** exports ************************************************************************************************

module.exports = {
    Account: mongoose.model('Account', AccountSchema),
    AuthToken: mongoose.model('AuthToken', AuthTokenSchema),
    SessionId: mongoose.model('SessionId', SessionIdSchema),
    App: mongoose.model('App', AppSchema),
    ObjectId: Schema.ObjectId
};



