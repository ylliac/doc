## Installer react-tools dans les dépendances dev

> npm install -g react-tools

## Installer la dépendance react

> bower install --save react

## Ajouter react dans le layout de l'application

Modifiez le fichier `layout.jade` :

> doctype html  
> html  
> &nbsp;&nbsp;  head  
> &nbsp;&nbsp;&nbsp;    title= title  
> &nbsp;&nbsp;&nbsp;    link(rel='stylesheet', href='/stylesheets/style.css')  
> &nbsp;&nbsp;  body  
> &nbsp;&nbsp;&nbsp;    block content  
> &nbsp;&nbsp;&nbsp;    **script(src='/libs/react/react.min.js')**

## Créer un composant

Créer un dossier `react_components` au même niveau que package.json.

Ajouter un fichier `helloworld.jsx` dans ce dossier, qui contient :

> React.render(  
> &nbsp; &lt;h1>Hello, world from React.js!&lt;/h1>,  
> &nbsp; document.getElementById('example')  
> );  

## Ajouter la commande de compilation dans `package.json`

Ajouter la ligne suivante dans la rubrique "scripts" :
> "react": "jsx -x jsx react_components public/javascripts/"

## Exécuter la compilation

> npm run react

Un fichier `helloworld.js` doit être apparu dans le dossier `public/javascripts/`

## Ajouter le composant dans l'application

Modifiez le fichier `layout.jade` :

> doctype html  
> html  
> &nbsp;&nbsp;  head  
> &nbsp;&nbsp;&nbsp;    title= title  
> &nbsp;&nbsp;&nbsp;    link(rel='stylesheet', href='/stylesheets/style.css')  
> &nbsp;&nbsp;  body  
> &nbsp;&nbsp;&nbsp;    block content  
> &nbsp;&nbsp;&nbsp;    script(src='/libs/react/react.min.js')  
> &nbsp;&nbsp;&nbsp;    **script(src='/javascripts/helloworld.js')**


## Créer une div pour accueillir le composant

Dans une des vues (par exemple `index.jade`), ajouter une div qui se nomme "example" :

> extends layout  
>   
> block content  
> &nbsp;  h1= title  
> &nbsp;  p Welcome to #{title}
>   
> &nbsp;  **&num;example**

Relancez le serveur, vous devriez voir apparaître la ligne "Hello, world from React.js!".



