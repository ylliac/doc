
# Domain Driven Design

Préambule : regarder cette [présentation de Sandro Mancuso](http://fr.slideshare.net/sandromancuso/crafted-design-geecon-2014)

## Schéma

![DDD](DDD.png)


## Briques

### Application service

Représente un use case.
Ne peut pas appeler un autre application service.
C'est le composant frontière donc c'est sur lui que l'on déclare les préocuppations de sécurité, de démarcation transactionnelle... .


### Domain service

Encapsule un traitement qui ne tient pas naturellement dans une entité ou un value object.


### Infrastructure service

Un service technique qui ne représente pas forcément un concept métier (pas nécessairement compréhensible par la MOA).
Par exemple, un service d'envoi d'email.

L'interface est dans la couche métier, l'implémentation est dans la couche infrastructure.

A noter que le repository est un infrastructure service spécialisé qui représente une collection.


### Entité

L'id peut être un value object :
- utile pour faire des ID composés
- plus explicite, un int peut être utilisé pour plusieurs entité alors qu'il est clair qu'un entitéAId ne sera utilisé que pour l'entité A

### Repository

Est une collection d'un type d'éléments avec des fonctions de requêtage avancée.
L'interface est dans la couche domaine mais l'implémentation est contenu dans la couche infrastructure. 
N'initie pas la transaction mais participe à la transaction courante.

Attention, Add et Remove sont idempotents : faire 2 add revient à en faire un seul. (TODO A CREUSER)

Nommages possibles :
- BookRepository
- Books
- BookCollection
- Library

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

## Organisation des classes

Plus de détails [ici](http://fr.slideshare.net/sandromancuso/crafted-design-geecon-2014)

Module Core :

- infrastructure : packages parsers, repositories, services...

![infrastructure](infrastructure.PNG) 

- model : Modèle domaine, ce dont l'application parle. Regroupé par catégorie de domaine liés entre eux.

![model](model.PNG) 

- use_cases : cas d'utilisations, ce que l'application fait. Regroupé par theme / epic

![use_cases](use_cases.PNG) 

 
Module Web :

- infrastructure : par exemple parsers XML / JSON
- controllers : flux de contrôle, invoque les uses cases dans le module core
- view : par exemple page objects, validators...
- ../webapp : ressources statiques








