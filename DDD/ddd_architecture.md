# Domain Driven Design - Architecture

## Architecture hexagonale

![hexagonale](hexagonale.PNG)

## NoSQL (cl�/valeur, colonne ou document, pas graphe)

Les BD orient�es agr�gat n'impl�mentent les mises � jour atomiques (ACID) que dans un Agr�gat.
Les changements dans deux agr�gats sont eux soumis � la coh�rence �ventuelle.

![nosql](nosql.PNG)

Les BD orient�es agr�gat permettent toutes de retrouver un Agr�gat par l'ID de son Aggregate Root.
L'impl�mentation du Value Object ID (VOID) est donc cruciale, ces bases �tant faites pour �tre clusteris�es.

Le VOID doit donc maintenir sa propri�t� d'unicit� dans un environnement r�pliqu� :
- UUID
- Timestamp+UUID pour lisibilit�/requ�tabilit�

Attention, utiliser une ID g�n�r�e par la BD NoSQL ne permet pas la stabilit� de l'identit�!

## Microservice

L'approche DDD est compatible avec une architecture microservices.

Chaque microservice est isol� et autonome, chaque BC est isol� et autonome : Bonne granularit�.

Chaque Contexte Born� (Bounded Context) sera d�ploy� dans un microservice.
Cela permet de garantir l'ind�pendance des BC.

## REST

![rest](rest.PNG)

Cependant, une architecture CQRS est compatible avec RESTful:
- on PUT des commandes
- on GET des queries

Dans le cas d�un mod�le non CQRS, utilisation de certaines caract�ristiques de REST comme levier pour exposer les cas d�utilisation (exprim�es par les Application Services) :
- Routing par URIs
- M�canismes de repr�sentation (content negotiation : https://en.wikipedia.org/wiki/Content_negotiation)


### Annexe - R�sum� de REST

Les ressources sont abstraites : On n�acc�de pas directement � la ressource mais � travers une repr�sentation.  
De nombreuses repr�sentations sont possibles : text/ html; image/jpeg;application/pdf.  

La requ�te HTTP sp�cifie la repr�sentation souhait� via l�ent�te HTTP (Header HTTP) Accept.  
La r�ponse HTTP sp�cifie sa repr�sentation via l�ent�te HTTP Content-Type.  

Le serveur ne maintient aucun �tat : Pas d�objet session sur le serveur.  
Facilite la scalabit� : Chaque instance du serveur peut traiter la requ�te entrante (on utilise g�n�ralement un load balancer).  
C�est le client qui maintient l��tat : Hypermedia.  

#### Hypermedia
Les r�ponses HTTP contient des liens dont on a besoin : Les changement d��tat du client sont fait via ces liens (hypermedia).  
On ne conna�t pas au pr�alable comment interagir avec le serveur.


![rest_code](rest_code.PNG)

![rest_methods](rest_methods.PNG)

## Styles d'int�gration

### Fichier

Simplicit� de mise en oeuvre : oui pour des faibles volumes
Couplage : faible
Fiabilit� (s�curit�, transaction, concurrence) : faible
Temps de latence : �lev�
Scalable : non car difficult� d'exploitation

### BDD Partag�e

Simplicit� de mise en oeuvre : oui 
Couplage : �lev� car n�cessit� d'un sch�ma commun
Fiabilit� (s�curit�, transaction, concurrence) : bonne, transactions 
Temps de latence : souvent �lev�
Scalable : non car trop lent

### Remote Procedure Call (RPC)

Simplicit� de mise en oeuvre : oui 
Couplage : tr�s �lev� 
Fiabilit� (s�curit�, transaction, concurrence) : bonne 
Temps de latence : faible
Scalable : non car le thread d'envoi peut rester bloqu�

### Asynchronous Messaging Style

Simplicit� de mise en oeuvre : oui 
Couplage : faible
Fiabilit� (s�curit�, transaction, concurrence) : perte du contexte de transaction et de s�curit�, gestion des erreurs plus complexe  
Temps de latence : envoi rapide (fire and forget)
Scalable : oui car faiblement coupl� temporellement, physiquement et logiquement

Pour les styles de communication, voir https://www.youtube.com/watch?v=Xwi1DU6KoQ4 et http://www.enterpriseintegrationpatterns.com/.

## Compatibilit� entre versions

![version_compat](version_compat.PNG)