
# Domain Driven Design

## Schéma

![schema](DDD.png)


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


