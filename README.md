DeployIt

Dependency
------------

 * [forever](https://github.com/nodejitsu/forever)
 * [yeoman](http://yeoman.io/) (branche 0.9)
 * [nodejs](http://nodejs.org/) (branche 0.8)


Configuration
----------------

Par ordre de priorité

 * __cli args__
 * __env__
 * __~/.dploy/setting.json__ (user difined prefs)
 * __/etc/dploy/setting.json__ (global perfs)
 * __srv/etc/setting.json__ (default pref)


### default prefs
    {
        "paths": {
            "upload": "/data/dploy/tmp/upload/",
            "unzip": "/data/dploy/tmp/unzip/",
            "data": "/data/dploy/store/"
        },

        "server": {
            "port": 3000
        },

        "urls": {
            "static": "http://api.dploy.plop.io/",
            "api": "http://dploy.plop.io/"
        }
    }



Tests & prod
----------------

### Dev

Modifier le fichier app/scripts/conf.js

    http.host = 'http://127.0.0.1:3000'

cmd1

    cd srv
    ./bin/start_dev.bash

cmd2

    yeoman server


### Prod
Là, ça marche mieux

    # build du projet (concat, mini, images opti)
    yeoman build
    # start server
    ./bin/start_prod.bash
