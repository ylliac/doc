Jenkins
 
Première découverte, il existe un système de promotion manuel permettant de dire « ce job la est assez bon, met le en prod ».
Ca permet d’avoir des jobs d’intégration continue et un job de mise en prod, et quand un job d’intégration continue a réussi, ya plus qu’à le promouvoir et Jenkins prend les artefacts déjà générés et les mets en prod.
 
Deuxième découverte : le workflow plugin. En gros c’est un script groovy qui va décrire le build.
C’est une approche différente du système de configuration qu’on utilise avec l’interface et tous les plugins qui ajoutent des cases à cocher incompréhensibles dans tous les sens :)
Ici, on vient décrire dans un script groovy les étapes de génération de la manière suivante :
 
node {
  git url: 'https://github.com/toto/tata.git'
  bat "mvn clean install"
}
 
Les principales avantages sont :
Build plus clair
Le fichier de config du build peut être versionné !
Les logs sont détaillés par étapes de build (http://nithril.github.io/assets/2015-05-14-jenkins-workflow-release-part2/orchestrator-job-steps.png)
On peut faire du Groovy :)
 
Docker
 
C’était pas une présentation de Docker mais de comment l’utiliser dans Jenkins.
Ce que je retiens :
-	Docker permet d’avoir plus d’exécuteurs sur une machine  possibilité d’exploiter les lancements en parallèle de Jenkins même avec une seule machine
-	Docker permet d’extraire la config de l’environnement de build en dehors de Jenkins 
Ca pourrit pas la machine Jenkins
On peut utiliser les images Docker utilisée par Jenkins en dev pour reproduire un bug « qui n’arrive que sur Jenkins » comme on en a régulièrement
-	On peut dire à Jenkins de faire des snapshots à différentes étapes du build (fonctionnalité Docker) pour débugger plus facilement 
 
En plus les fonctions de gestion de Docker sont accessibles dans le workflow plugin, la boucle est bouclée !
