

# Sources
http://www.rahulpnath.com/blog/yo-ko-a-yeoman-generator-for-knockoutjs/
http://hombredequeso.id.au/2015/03/17/installing-yo-ko.html

# Prérequis

Yeoman : npm install -g yo
Générateur Knockout : npm install generator-ko
Gulp : npm install -g gulp
Babel : npm install -g babel-cli

# Créer le squelette de l'appli

yo ko

# Builder l'appli

gulp

## Problème avec la dépendance `babel-core`

npm install --save-dev babel-core@"~5.8.23"
npm update

## Problème avec intro.js : Unexpected token
(http://stackoverflow.com/questions/33198584/gulp-failing-default-task-due-to-jquery-error-for-generator-ko)

Dans `gulpfile.js`, ajouter `slash = require('slash')` dans la liste des plugins et ajouter `pathname = slash(pathname);` au début de la fonction `babelTranspile`.






