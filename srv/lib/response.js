'use strict';
var http = require('http');

http.ServerResponse.prototype.respond = function (content, status) {
    if ('undefined' === typeof status) { // only one parameter found
        if ('number' === typeof content || !isNaN(parseInt(content, 10))) { // usage 'respond(status)'
            status = parseInt(content, 10);
            content = undefined;
        } else { // usage 'respond(content)'
            status = 200;
        }
    }
    if (status !== 200) { // error
        content = {
            'code': status,
            'status': http.STATUS_CODES[status],
            'message': content && content.toString() || null
        };
    }
    if ('object' !== typeof content) { // wrap content if necessary
        content = {'result': content};
    }
    // respond with JSON data
    this.statusCode = status;
    this.json(content);
};