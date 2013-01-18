DeployIt

Dependancy
------------

 * [forever](https://github.com/nodejitsu/forever)
 * [yeoman](http://yeoman.io/)
 * [nodejs](http://nodejs.org/) (branche 0.8)
 * [mongodb](http://www.mongodb.org/) (branche 2.2)

Tests & prod
----------------

### Dev
C'est encore buger, :-(
Je galère avec la configuration du script d'upload côté serveur.

mais techniquement ça doit donner

    forever lib/start.js -w --watchDirectory lib

pour lancer le serveur sur le port 3000

    yeoman server

pour lancer un serveur spécial pour l'interface sur le port 3501

### Prod
Là, ça marche mieux

    # build du projet (concat, mini, images opti)
    yeoman build
    # start server
    forever lib/start.js -w --watchDirectory lib
