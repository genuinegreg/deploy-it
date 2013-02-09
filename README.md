DeployIt

Dependency
------------

 * [forever](https://github.com/nodejitsu/forever)
 * [yeoman](http://yeoman.io/)
 * [nodejs](http://nodejs.org/) (branche 0.8)


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
