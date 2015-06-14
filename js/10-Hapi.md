
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


## Créer une vue

Créez un dossier `views`.

Dans ce dossier, créez un fichier `layout.jade` contenant :

```
doctype html(lang='fr')
head
  meta(charset='utf-8')
  meta(http-equiv='X-UA-Compatible', content='IE=edge')
  meta(name='viewport', content='width=device-width, initial-scale=1')
  meta(name='description', content='')
  meta(name='author', content='')
  link(rel='icon', href='../../favicon.ico')
  title= 'Hello world'
body
    block content
```

Dans ce même dossier, créez aussi un fichier `index.jade` contenant :

```
extends layout

block content
  p Welcome!
```


## Ajouter les vues au serveur

Installez le module `jade` : 
> npm install jade --save

Modifier le fichier `app.js` de la façon suivante :

```javascript
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
    port: 3000
});

// --> Début de l'ajout
server.views({
    engines: {
        jade: require("jade")
    },
    path: __dirname + '/views',
    compileOptions: {
        // should be set only in dev-context!
        pretty: true
    }
});
// <-- Fin de l'ajout

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply.view('index', {}); // <-- Ligne modifiée
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


## Source

[http://hapijs.com/api](http://hapijs.com/api)
[http://blog.cedric-ziel.com/articles/manipulating-hapijs-view-context/](http://blog.cedric-ziel.com/articles/manipulating-hapijs-view-context/)
[https://medium.com/@_expr/the-pursuit-of-hapi-ness-d82777afaa4b](https://medium.com/@_expr/the-pursuit-of-hapi-ness-d82777afaa4b)



