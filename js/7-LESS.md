
## Installer la dépendance less

> bower install less --save


## Déclarer le module `less`

Modifiez le fichier `config.js` de la façon suivante :

> //Define module catalog  
> requirejs.config({  
> &nbsp;    baseUrl: '.',  
> &nbsp;    paths: {  
> &nbsp;&nbsp;&nbsp;        jquery: 'libs/jquery/dist/jquery.min',  
> &nbsp;&nbsp;&nbsp;        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',  
> &nbsp;&nbsp;&nbsp;        react: 'libs/react/react.min',  
> &nbsp;&nbsp;&nbsp;        **less: 'libs/less/dist/less.min',**  
> &nbsp;&nbsp;&nbsp;        index: 'javascripts/index',  
> &nbsp;&nbsp;&nbsp;        helloworld: 'javascripts/helloworld',  
> &nbsp;&nbsp;&nbsp;        hello: 'javascripts/hello'  
> &nbsp;    }  
> });  
>   
> //Load core modules  
> require(['jquery'**, 'less'**], function () {  
> &nbsp;    require(['bootstrap'], function () {});  
> });


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






