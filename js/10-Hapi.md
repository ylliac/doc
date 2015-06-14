
# Initialiser le projet

> mkdir hapi
> cd hapi
> npm init

Validez tous les choix sauf pour :
- le nom de l'application, saisissez `app` au lieu de `hapi` 
- le nom du point d'entrée, saisissez `app.js` au lieu de `index.js` 

> npm install --save hapi

## Créer le serveur

Créez un fichier `app.js` contenant :

```javascript
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
```

## Lancer le serveur

Tapez :
> node app.js

... et rendez vous à l'adresse [http://localhost:3000/](http://localhost:3000/).






