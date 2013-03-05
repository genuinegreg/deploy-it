'use strict';

var testTools = require('./01_testTools');

describe('REST API', function () {

    beforeEach(function (done) {
        testTools.dropDb(done);
    });

    describe('/user.json/signin', function () {
        it('should create account without errors', function (done) {
            testTools.signin('greg', 'plop', function (err) {
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should failed to create two account with the same username', function (done) {
            testTools.signin('greg', 'plop', function (err) {

                if (err) {
                    throw err;
                }

                testTools.signin('greg', 'plop2', function (err) {

                    if (!err) {
                        throw new Error('"greg" account created for the second time');
                    }
                    if (err && err.restCode !== 400) {
                        throw err;
                    }

                    done();


                });
            });
        });

        it('should create two accoutn with =/= username without errors', function (done) {
            testTools.signin('greg', 'plop', function (err) {

                if (err) {
                    throw err;
                }


                testTools.signin('toto', 'plop', function (err) {

                    if (err) {
                        throw err;
                    }

                    done();
                });
            });
        });


    });

    describe('/user.json/login', function () {

        it('should login with valid credential', function (done) {
            testTools.signin('greg', 'plop', function (err) {
                if (err) {
                    throw err;
                }
                testTools.login({username: 'greg', password: 'plop'}, function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
            });
        });

        it('should failed to login with wrong username', function (done) {
            testTools.signin('toto', 'plop', function (err) {
                if (err) {
                    throw err;
                }
                testTools.login({username: 'greg', password: 'plop'}, function (err) {
                    if (!err) {
                        throw new Error('"greg" loged in');
                    }
                    if (err && err.restCode !== 400) {
                        throw err;
                    }

                    done();
                });
            });
        });

        it('should failed to login with wrong password', function (done) {
            testTools.signin('greg', 'bam', function (err) {
                if (err) {
                    throw err;
                }
                testTools.login({username: 'greg', password: 'plop'}, function (err) {
                    if (!err) {
                        throw new Error('"greg" loged in');
                    }
                    if (err && err.restCode !== 400) {
                        throw err;
                    }

                    done();
                });
            });
        });

        it('should failed to login with wrong credential', function (done) {
            testTools.signin('toto', 'plop', function (err) {
                if (err) {
                    throw err;
                }
                testTools.login({username: 'greg', password: 'bam'}, function (err) {
                    if (!err) {
                        throw new Error('"greg" loged in');
                    }
                    if (err && err.restCode !== 400) {
                        throw err;
                    }

                    done();
                });
            });
        });

        it('should failed without credential', function (done) {
            testTools.signin('toto', 'plop', function (err) {
                if (err) {
                    throw err;
                }
                testTools.login({}, function (err) {
                    if (!err) {
                        throw new Error('"greg" loged in');
                    }
                    if (err && err.restCode !== 400) {
                        throw err;
                    }

                    done();
                });
            });
        });


    });


    describe('/user.json/logout', function () {
        it('should not fail with invalid sessionid', function (done) {
            testTools.logout('123456', function (err) {
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should not fail with valid sessionid', function (done) {

            testTools.signin('greg', 'plop', function (err) {

                if (err) {
                    throw err;
                }
                testTools.login({username: 'greg', password: 'plop'}, function (err, data) {

                    if (err) {
                        throw err;
                    }
                    testTools.logout(data.sessionid, function (err) {
                        if (err) {
                            throw err;
                        }
                        done();
                    });
                });
            });
        });
    });


    describe('/app.json/list', function () {

        it('should return app list', function (done) {
            testTools.client.get('/app.json/list', function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    if (res.statusCode !== 200 &&
                        (data.code === undefined || data.code === 200)) {

                        throw new Error('invalid response from /app.json/list');
                    }
                    done();
                }
            });
        });
    });

});