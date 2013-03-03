'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ** Schema definition ************************************************************************************************
var AccountSchema = new Schema({
    creation: { type: Date, 'default': Date.now },
    users: [
        {
            _id: {type: String, index: { unique: true }},
            password: String
        }
    ]
});

var SessionId = new Schema({
    _id: String,
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    update: {type: Date, 'default': Date.now, index: { expires: '15m' }}
});


var AppSchema = new Schema({
    upload: { type: Date, 'default': Date.now },
    hash: String,
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
    SessionId: mongoose.model('SessionId', SessionId),
    App: mongoose.model('App', AppSchema),
    ObjectId: Schema.ObjectId
};



