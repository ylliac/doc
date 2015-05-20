## Installer Express Generator

> npm install express-generator -g

## Générer le squelette du serveur

> express server

> cd server

> npm install

## Lancer le serveur

> npm start

Aller ensuite à l'adresse http://localhost:3000/.

## Structure du projet généré 

.
- app.js
- bin
  - www
- package.json
- public
 - images
 - javascripts
 - stylesheets
   - style.css
- routes
 - index.js
 - users.js
- views
 - error.jade
 - index.jade
 - layout.jade
 
## Installer `nodemon`

C'est un outil qui relance automatiquement le server quand il y a un changement dans l'application

> npm install -g nodemon

## Ajouter le script nodemon dans `package.json`

Ajouter la ligne suivante dans la rubrique "scripts" :
> "server": "nodemon ./bin/www"

