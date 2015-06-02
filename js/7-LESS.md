
## Installer la dépendance less

> bower install less --save


## Déclarer le module `less`

Modifiez le fichier `config.js` de la façon suivante :


```javascript
//Define module catalog  
requirejs.config({  
  baseUrl: '.',  
  paths: {  
    jquery: '/libs/jquery/dist/jquery.min',  
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',  
    react: '/libs/react/react.min',  
    less: '/libs/less/dist/less.min', //<-- Ajout  
    index: '/javascripts/index',  
    helloworld: '/javascripts/helloworld',  
    hello: '/javascripts/hello'  
  }  
});  
 
//Load core modules  
require(['jquery', 'less'], function () {  //<-- Ajout de 'less'  
  require(['bootstrap'], function () {});  
});
```


## Créer une feuille de style LESS

Créer le fichier `custom.less` à côté du fichier `style.css` :

> @color: red;  
> #header {  
> &nbsp;&nbsp;    color: @color;  
> }  
>   
> h1 {  
> &nbsp;&nbsp;    color: @color;  
> }  


## Ajouter la ligne suivante au layout

Ajouter cette ligne dans la partie `head` du fichier `layout.jade` :

> link(rel='stylesheet/less', type="text/css", href='/stylesheets/custom.less')


## Tester

Relancez le serveur, vous devriez voir du rouge apparaître.






