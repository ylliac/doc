
## Installer la dépendance underscore

> bower install underscore --save


## Déclarer le module `underscore`

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
    underscore: '/libs/underscore/underscore-min', //<-- Ajout  
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

## Ajouter une instruction utilisant underscore

Modifiez le fichier `javascripts/index.js` :

> define(function (require) {  
> &nbsp;&nbsp;    require('jquery');  
> &nbsp;&nbsp;    **require('underscore');**  
> &nbsp;&nbsp;    console.log('Module index chargé');  
> &nbsp;&nbsp;    $(document).prop('title', 'Module index chargé');  
> &nbsp;&nbsp;    **_.each([1, 2, 3], alert);**  
> &nbsp;&nbsp;    return function () {};  
> }); 

## Tester

Relancez le serveur, vous devriez voir trois messages d'alerte affichant successivement 1, 2 et 3.






