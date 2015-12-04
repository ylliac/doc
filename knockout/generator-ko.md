
**TODO** 

Passer les data-bind d3graph en balise <d3graph>, idem pour le reste

Mettre les valeurs dans un tableau (datatable)
  
Utiliser Redux ! http://rackt.org/redux/  


**DONE**  

Styliser le graph : 
- http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5 
- http://gustavnikolaj.github.io/knockout-d3-line-graph/
 
Améliorer le format des dates


# Sources
http://www.rahulpnath.com/blog/yo-ko-a-yeoman-generator-for-knockoutjs/
http://hombredequeso.id.au/2015/03/17/installing-yo-ko.html

# Créer une application Knockout

## Prérequis

Yeoman : npm install -g yo  
Générateur Knockout : npm install generator-ko  
Gulp : npm install -g gulp  
Babel : npm install -g babel-cli  
HTTP Server : npm install -g http-server  
Karma : npm install -g karma-cli  

## Créer le squelette de l'appli

yo ko

## Builder l'appli

gulp

### Problème avec la dépendance `babel-core`
(https://github.com/nenitiko/generator-ko/commit/66ad960289f22172ded1a52df689f5f021faa184)

npm install --save-dev babel-core@"~5.8.23"
npm update

### Problème avec intro.js : Unexpected token
(http://stackoverflow.com/questions/33198584/gulp-failing-default-task-due-to-jquery-error-for-generator-ko)

Executer `npm install --save-dev slash@"^1.0.0"`.
Dans `gulpfile.js`, ajouter `slash = require('slash')` dans la liste des plugins et ajouter `pathname = slash(pathname);` au début de la fonction `babelTranspile`.

## Lancer l'appli

La version de développement : `http-server src`.
La version release : `http-server dist` après avoir lancé `gulp`.

## Lancer les tests

karma start






