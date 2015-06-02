
# Installer la dépendance Mocha

>bower install mocha --save

# Déclarer le module `mocha`

Modifiez le fichier `config.js` de la façon suivante :


```javascript
//Define module catalog  
requirejs.config({  
  baseUrl: '.',  
  paths: {  
    jquery: '/libs/jquery/dist/jquery.min',  
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',  
    react: '/libs/react/react.min',  
    less: '/libs/less/dist/less.min',  
    underscore: '/libs/underscore/underscore-min',  
    mocha: '/libs/mocha/mocha', //<-- Ajout  
    index: '/javascripts/index',  
    helloworld: '/javascripts/helloworld',  
    hello: '/javascripts/hello'  
  }  
});  
 
//Load core modules  
require(['jquery', 'less'], function () {  
  require(['bootstrap'], function () {});  
});
```

# Installer la dépendance Chai

> bower install chai --save

# Déclarer le module `chai`

Modifiez le fichier `config.js` de la façon suivante :


```javascript
//Define module catalog  
requirejs.config({  
  baseUrl: '.',  
  paths: {  
    jquery: '/libs/jquery/dist/jquery.min',  
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',  
    react: '/libs/react/react.min',  
    less: '/libs/less/dist/less.min',  
    underscore: '/libs/underscore/underscore-min',  
    mocha: '/libs/mocha/mocha',  
    chai: '/libs/chai/chai', //<-- Ajout  
    index: '/javascripts/index',  
    helloworld: '/javascripts/helloworld',  
    hello: '/javascripts/hello'  
  }  
});  
 
//Load core modules  
require(['jquery', 'less'], function () {  
  require(['bootstrap'], function () {});  
});
```

# Créer le module `repeat` à tester

Dans le dossier `javascript`, créez un fichier `repeat.js` qui contient :

> define(function (require) {  
>   
>     if (!String.prototype.repeat) {  
>         String.prototype.repeat = function (times) {  
>             return new Array(times + 1).join(this);  
>         }  
>     }  
>   
> });  

# Déclarer le module `repeat`

Modifiez le fichier `config.js` de la façon suivante :


```javascript
//Define module catalog  
requirejs.config({  
  baseUrl: '.',  
  paths: {  
    jquery: '/libs/jquery/dist/jquery.min',  
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',  
    react: '/libs/react/react.min',  
    less: '/libs/less/dist/less.min',  
    underscore: '/libs/underscore/underscore-min',  
    mocha: '/libs/mocha/mocha',  
    chai: '/libs/chai/chai',   
    repeat: '/javascripts/repeat', //<-- Ajout  
    index: '/javascripts/index',  
    helloworld: '/javascripts/helloworld',  
    hello: '/javascripts/hello'  
  }  
});  
 
//Load core modules  
require(['jquery', 'less'], function () {  
  require(['bootstrap'], function () {});  
});
```


# Créer le test `repeat.spec.js`

Créez un dossier `test` dans le dossier `public`.

Dans ce dossier, créez un fichier `repeat.spec.js` qui contient :

```javascript
define(function (require) {
    require('mocha');
    var chai = require('chai');
    require('repeat');

    var expect = chai.expect;

    describe("repeat", function () {
        it("repeats strings", function () {
            expect("abc".repeat(2)).to.equal("abcabc");
            expect("abc".repeat(0)).to.equal("");
        });
    });
});
```

# Déclarer le module `repeat.spec` 

Modifiez le fichier `config.js` de la façon suivante :


```javascript
//Define module catalog  
requirejs.config({  
  baseUrl: '.',  
  paths: {  
    jquery: '/libs/jquery/dist/jquery.min',  
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',  
    react: '/libs/react/react.min',  
    less: '/libs/less/dist/less.min',  
    underscore: '/libs/underscore/underscore-min',  
    mocha: '/libs/mocha/mocha',  
    chai: '/libs/chai/chai',   
    repeat: '/javascripts/repeat',  
    repeat_spec: '/test/repeat.spec', //<-- Ajout  
    index: '/javascripts/index',  
    helloworld: '/javascripts/helloworld',  
    hello: '/javascripts/hello'  
  }  
});  
 
//Load core modules  
require(['jquery', 'less'], function () {  
  require(['bootstrap'], function () {});  
});
```

# Créez le lanceur de test `runner.js`

Dans le dossier `test`, créez un fichier `runner.js` qui contient :

```javascript  
define(function (require) {  
    var mocha = require('mocha');  
    mocha.setup('bdd');  
    require('chai');  
 
    //Add your tests here
    require('repeat_spec');  
 
    mocha.run();  
});  
``` 

# Déclarer le module `test` 

Modifiez le fichier `config.js` de la façon suivante :

```javascript
//Define module catalog  
requirejs.config({  
  baseUrl: '.',  
  paths: {  
    jquery: '/libs/jquery/dist/jquery.min',  
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',  
    react: '/libs/react/react.min',  
    less: '/libs/less/dist/less.min',  
    underscore: '/libs/underscore/underscore-min',  
    mocha: '/libs/mocha/mocha',  
    chai: '/libs/chai/chai',   
    repeat: '/javascripts/repeat',  
    repeat_spec: '/test/repeat.spec',  
    test: '/test/runner', //<-- Ajout  
    index: '/javascripts/index',  
    helloworld: '/javascripts/helloworld',  
    hello: '/javascripts/hello'  
  }  
});  
 
//Load core modules  
require(['jquery', 'less'], function () {  
  require(['bootstrap'], function () {});  
});
```

# Créer la page de test

Dans le dossier `views`, créez un fichier `test.jade` qui contient :

```
extends layout

block content
  h1= title
  p Welcome to #{title}
    
  #mocha
    p
      a(href='.') Index
  
  #messages
  
  #fixtures

  script.
    require(['config'], function() {
      require(['test'], function() {
      });
    });
```

Puis dans le dossier `routes`, créez un fichier `test.js` qui contient :

```javascript
var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function (req, res, next) {
    res.render('test', {
        title: 'Tests'
    });
});

module.exports = router;
```

Et enfin modifiez le fichier `app.js` pour ajouter les lignes suivantes :

```javascript
var routes = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test'); //<-- Ajout  
```

```javascript
app.use('/', routes);
app.use('/users', users);
app.use('/test', test); //<-- Ajout  
```

# Tester

Lancez le serveur :
> npm start

... et allez sur la page [http://localhost:3000/test](http://localhost:3000/test).


TODO 
 Remplacer les blocs de code > par des ```  
 Remettre des /dans tous les config.js et dans data-main
 Résoudre les bugs

# Sources

http://chaijs.com/  
https://nicolas.perriault.net/code/2013/testing-frontend-javascript-code-using-mocha-chai-and-sinon/
http://www.2ality.com/2011/10/jasmine.html
http://stackoverflow.com/questions/9369690/access-global-mocha-js-functions-when-using-require-js
http://stackoverflow.com/questions/19191384/how-can-i-solve-referenceerror-expect-is-not-defined-error-message



