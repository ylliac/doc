

# Commandes docker

## Test rapide 

docker run -d -p 80:80 --name webserver nginx

puis se connecter sur http://localhost 

## Killer un container

`docker ps` pour voir la liste des containers actifs et leur id.

`docker kill id_du_container` pour killer un container.




# Bugs

## driver failed programming external connectivity on endpoint webserver

```
docker: Error response from daemon: driver failed programming external connectivity on endpoint webserver (f461628b46acb2ff0e93ef136fb1930e4b9a542e84bc54289f4f57197dca48e2): Error starting userland proxy: Bind for 0.0.0.0:80: unexpected error Unix.Unix_error(Unix.EACCES, "bind", "").
```

Le port doit déjà être occupé, essayer de se connecter sur un autre port.
Par exemple si la commande suivante ne marche pas :

> docker run -d -p 80:80 --name webserver nginx

Essayer :

> docker run -d -p 8080:80 --name webserver nginx

Tips : sur windows 10, le service IIS peut être activé sur le port 80, pour le désactiver : http://www.lecoindunet.com/demarrer-arreter-service-iis-546


## The name "/toto" is already in use

```
Error response from daemon: Conflict. The name "/webserver" is already in use by container ed90e8ff006ce4440ef1a401e3f79411b76dc1f29d7288383f2032819c654a56. You have to remove (or rename) that container to be able to reuse that name..
```

Faire :

> docker rm ed90e8ff006ce4440ef1a401e3f79411b76dc1f29d7288383f2032819c654a56







