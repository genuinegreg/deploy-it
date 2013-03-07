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

    npm install
    bower install

Modifier le ~/.dploy/settings.json ou le fichier /etc/dploy/settings.json

    {
        // ...

        "urls": {
            "static": "http://<host>",
            "api": "http://<host>"
        }
    }

start api

    cd srv
    ./bin/start_dev.bash

start client

    yeoman server


### Prod

modifier les fichier app/scripts/app.js et  ~/.dploy/settings.json ou le fichier /etc/dploy/settings.json

    # build du projet (concat, mini, images opti)
    yeoman build
    # start server
    ./bin/start_prod.bash
