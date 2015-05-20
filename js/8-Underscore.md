
## Installer la dépendance underscore

> bower install underscore --save


## Déclarer le module `underscore`

Modifiez le fichier `config.js` de la façon suivante :

> //Define module catalog  
> requirejs.config({  
> &nbsp;    baseUrl: '.',  
> &nbsp;    paths: {  
> &nbsp;&nbsp;&nbsp;        jquery: 'libs/jquery/dist/jquery.min',  
> &nbsp;&nbsp;&nbsp;        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',  
> &nbsp;&nbsp;&nbsp;        react: 'libs/react/react.min',  
> &nbsp;&nbsp;&nbsp;        less: 'libs/less/dist/less.min',  
> &nbsp;&nbsp;&nbsp;        **underscore: 'libs/underscore/underscore-min',**
> &nbsp;&nbsp;&nbsp;        index: 'javascripts/index',  
> &nbsp;&nbsp;&nbsp;        helloworld: 'javascripts/helloworld',  
> &nbsp;&nbsp;&nbsp;        hello: 'javascripts/hello'  
> &nbsp;    }  
> });  
>   
> //Load core modules  
> require(['jquery', 'less'], function () {  
> &nbsp;    require(['bootstrap'], function () {});  
> });


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






