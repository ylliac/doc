## Installer bower

> npm install -g bower

## Initialiser le projet

Au même endroit que le package.json, tapez dans une invite de commande :

> bower init

Si vous ne savez pas quoi répondre aux questions, validez les choix par défaut.

## Faire le lien entre les composants bower et le serveur expressjs
*Source : http://programer.tips/2014/09/serving-bower-components-with-expressjs.html*

En dessous de la ligne suivante :

> app.use(express.static(path.join(__dirname, 'public')));

... ajouter :

> app.use('/libs',  express.static(path.join(__dirname, '/bower_components')));



