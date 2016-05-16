
# Domain Driven Design

Préambule : regarder cette [présentation de Sandro Mancuso](http://fr.slideshare.net/sandromancuso/crafted-design-geecon-2014)

## Schéma

![DDD](DDD.png)


## Briques

### Application service

Représente un use case.
Ne peut pas appeler un autre application service.


### Domain service

Encapsule un traitement qui ne tient pas naturellement dans une entité ou un value object.

### Entité

L'id peut être un value object :
- utile pour faire des ID composés
- plus explicite, un int peut être utilisé pour plusieurs entité alors qu'il est clair qu'un entitéAId ne sera utilisé que pour l'entité A

### Repository

Est une collection d'un type d'éléments avec des fonctions de requêtage avancée.

L'interface est dans la couche domaine mais l'implémentation est contenu dans la couche infrastructure. 

## Lien avec MVC

![MVC](MVC.PNG)

Approche classique :
- M est le modèle de persistance anémique (anti pattern anemic model)
- La logique est dans des controlleurs et services stateless (anti pattern fat controller)
- Le rendu graphique est dans la vue

=> Le plus gros de l'application est dans le C de MVC

Approche DDD :
- M est le modèle métier
- La couche controleur est repsonsable de la serialization des requêtes et réponses, de la conversion des exceptions vers des erreurs HTTP, du routing...
- Le rendu graphique est toujours dans la vue

=> Le plus gros de l'application est dans le M de MVC, le V et le C ne sont que la couche de présentation (Delivery Mechanism)









