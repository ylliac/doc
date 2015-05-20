
# Mise en place

## Installer la dépendance requirejs

> bower install requirejs --save

## Ajouter la ligne suivante au layout

Ajouter cette ligne dans la partie `head` du fichier `layout.jade` :

> script(data-main='config', src='/libs/requirejs/require.js')

## Créer le fichier de configuration 

Créer un fichier `config.js` dans le dossier `public`.

Ajouter le contenu suivant :

> //Define module catalog  
> requirejs.config({  
> &nbsp;    baseUrl: '.',  
> &nbsp;    paths: {  
> &nbsp;&nbsp;&nbsp;        jquery: 'libs/jquery/dist/jquery.min',  
> &nbsp;&nbsp;&nbsp;        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',  
> &nbsp;&nbsp;&nbsp;        react: 'libs/react/react.min'  
> &nbsp;    }  
> });  
>   
> //Load core modules  
> require(['jquery'], function () {  
> &nbsp;    require(['bootstrap'], function () {});  
> });  

## Supprimer toutes les autres lignes de chargement de scripts dans le layout

Elles ne devraient plus être nécessaires.


#Créer un module

## Créer le module `index`

Créer un fichier `index.js` dans le dossier `public/javascripts`.

> define(function (require) {  
> &nbsp;&nbsp;    var jquery = require('jquery');  
> &nbsp;&nbsp;    console.log('Module index chargé');  
> &nbsp;&nbsp;    $(document).prop('title', 'Module index chargé');  
> &nbsp;&nbsp;    return function () {};  
> });  

*Note : ce module utilise la syntaxe CommonJS simplifiée, voir http://requirejs.org/docs/whyamd.html#sugar*

## Déclarer le module `index`

Dans le fichier `config.js`, ajouter la ligne suivante :

> //Define module catalog  
> requirejs.config({  
> &nbsp;    baseUrl: '.',  
> &nbsp;    paths: {  
> &nbsp;&nbsp;&nbsp;        jquery: 'libs/jquery/dist/jquery.min',  
> &nbsp;&nbsp;&nbsp;        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',  
> &nbsp;&nbsp;&nbsp;        react: 'libs/react/react.min',  
> &nbsp;&nbsp;&nbsp;        **index: 'javascripts/index'**  
> &nbsp;    }  
> });  
>   
> //Load core modules  
> require(['jquery'], function () {  
> &nbsp;    require(['bootstrap'], function () {});  
> });  

## Appeler le module

A la fin du template `index.jade`, ajouter le script suivant :

> extends layout  
>   
> block content  
> &nbsp;&nbsp;  h1= title  
> &nbsp;&nbsp;  p Welcome to #{title}  
>     
> &nbsp;&nbsp;  #example  
>   
> &nbsp;&nbsp;  script.  
> &nbsp;&nbsp;&nbsp;&nbsp;    require(['config'], function() {  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      require(['index'], function() {  
> &nbsp;&nbsp;&nbsp;&nbsp;      });  
> &nbsp;&nbsp;    });  


*Attention à l'indentation du script ! Si le script n'est pas indenté, il ne sera pas considéré comme faisant partie de `block-content` et ne sera pas appelé.*

## Tester

Relancez le serveur, le titre de la page devrait être changé en "Module index chargé".

# Utiliser React : Un simple appel à React.render

## Transformer le fichier `helloworld.jsx` en module RequireJS

Modifiez le fichier `helloworld.jsx` :

> **define(function (require) {  
> &nbsp;&nbsp;    var React = require('react');**  
>   
> &nbsp;&nbsp;    React.render(  
> &nbsp;&nbsp;&nbsp;&nbsp;        &lt;h1>Hello, world from React.js!&lt;/h1>,  
> &nbsp;&nbsp;&nbsp;&nbsp;        document.getElementById('example')  
> &nbsp;&nbsp;    );  
>   
> &nbsp;&nbsp;    **return function () {};  
> });**  

... et générez le javascript avec la fonction :

> npm run react

## Déclarer le module `helloworld`

Dans le fichier `config.js`, ajouter la ligne suivante :

> //Define module catalog  
> requirejs.config({  
> &nbsp;    baseUrl: '.',  
> &nbsp;    paths: {  
> &nbsp;&nbsp;&nbsp;        jquery: 'libs/jquery/dist/jquery.min',  
> &nbsp;&nbsp;&nbsp;        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',  
> &nbsp;&nbsp;&nbsp;        react: 'libs/react/react.min',  
> &nbsp;&nbsp;&nbsp;        index: 'javascripts/index',  
> &nbsp;&nbsp;&nbsp;        **helloworld: 'javascripts/helloworld'**  
> &nbsp;    }  
> });  
>   
> //Load core modules  
> require(['jquery'], function () {  
> &nbsp;    require(['bootstrap'], function () {});  
> });  


## Appeler le module

A la fin du template `index.jade`, complétez le script :

> extends layout  
>   
> block content  
> &nbsp;&nbsp;  h1= title  
> &nbsp;&nbsp;  p Welcome to #{title}  
>     
> &nbsp;&nbsp;  #example  
>   
> &nbsp;&nbsp;  script.  
> &nbsp;&nbsp;&nbsp;&nbsp;    require(['config'], function() {  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      require(['index'**, 'helloworld'**], function() {  
> &nbsp;&nbsp;&nbsp;&nbsp;      });  
> &nbsp;&nbsp;    });

## Tester

Relancez le serveur, le message "Hello, world from React.js!" devrait apparaitre.


# Utiliser React : Les composants

L'exemple précédent n'encapsulait qu'un appel à `React.render` et n'utilisait pas ce qui fait la force de React : les **composants**.

## Créer un composant React

Modifiez le fichier `helloworld.jsx` :

> define(function (require) {  
> &nbsp;&nbsp;    var React = require('react');  
> &nbsp;&nbsp;    **var Hello = require('hello');**  
>   
> &nbsp;&nbsp;    React.render(  
> &nbsp;&nbsp;&nbsp;&nbsp;        **&lt;Hello/>**,  
> &nbsp;&nbsp;&nbsp;&nbsp;        document.getElementById('example')  
> &nbsp;&nbsp;    );  
>   
> &nbsp;&nbsp;    return function () {};  
> });

Il faut maintenant créer le module `hello`.

Pour cela, créer le fichier `hello.jsx` :

> define(function (require) {  
> &nbsp;&nbsp;    var React = require('react');  
>   
> &nbsp;&nbsp;    var Hello = React.createClass({  
> &nbsp;&nbsp;&nbsp;&nbsp;      render: function() {  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        return (&lt;h1>Hello, world from React.js!&lt;/h1>);  
> &nbsp;&nbsp;&nbsp;&nbsp;      }  
> &nbsp;&nbsp;    });  
>  
> &nbsp;&nbsp;    return Hello;  
> });  

... et générez le javascript avec la fonction :

> npm run react

## Déclarer le module `hello`

Dans le fichier `config.js`, ajouter la ligne suivante :

> //Define module catalog  
> requirejs.config({  
> &nbsp;    baseUrl: '.',  
> &nbsp;    paths: {  
> &nbsp;&nbsp;&nbsp;        jquery: 'libs/jquery/dist/jquery.min',  
> &nbsp;&nbsp;&nbsp;        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',  
> &nbsp;&nbsp;&nbsp;        react: 'libs/react/react.min',  
> &nbsp;&nbsp;&nbsp;        index: 'javascripts/index',  
> &nbsp;&nbsp;&nbsp;        helloworld: 'javascripts/helloworld',  
> &nbsp;&nbsp;&nbsp;        **hello: 'javascripts/hello'**  
> &nbsp;    }  
> });  
>   
> //Load core modules  
> require(['jquery'], function () {  
> &nbsp;    require(['bootstrap'], function () {});  
> });  

## Tester

Relancez le serveur, le message "Hello, world from React.js!" devrait toujours apparaitre.




