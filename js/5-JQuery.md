
## Installer la dépendance jquery

> bower install jquery --save


## Ajouter la dépendance dans le layout

Ajouter la ligne suivante à la fin du layout, avant la dépendance bootstrap :

> script(src='/libs/jquery/dist/jquery.min.js')

## Ajouter une instruction utilisant jquery

Ajouter le script suivant à la fin du layout :

> .script  
> &nbsp;&nbsp;    console.log('Module index chargé');  
> &nbsp;&nbsp;    $(document).prop('title', 'Module index chargé'); 

## Tester

Relancez le serveur, le titre de la page devrait être changé en "Module index chargé".

