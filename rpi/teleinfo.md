
# Brancher le RPi au compteur EDF 

## Principe 

On branche le RPi à un petit circuit imprimé qui permet de récupérer les informations "téléinfo" du compteur EDF.
Ensuite on analyse tout ca.

## Le circuit imprimé

Vous pouvez trouver des dongle autour de 40-50€.
Sinon, un indépendant peut vous fournir le circuit nu pour 20€ frais d'envoi compris : https://www.tindie.com/stores/Hallard/.

Une fois que vous vous êtes procuré le circuit, brancher le au port USB du RPi et connectez deux cables entre les deux fiches du circuit et les fiches `L1` et `L2` du compteur EDF.
Normalement une petite diode rouge devrait s'allumer sur le circuit s'il est bien alimenté.


# Désactiver le terminal via la liaison série

Tapez la commande
> sudo raspi-config

Allez dans le menu `Advanced Options`, sélectionnez `Serial` et à la question `Would you like a login shell to be accessible over serial?` sélectionnez `No` puis `Ok` et enfin `Finish`. Il est possible que vous deviez rebooter le RPi après cela.


# Tester la réception de messages avec Node Red

## Installer NodeJS et npm

Pour installer la dernière version de nodejs, tapez les commandes suivante :
> wget http://node-arm.herokuapp.com/node_0.10.36_armhf.deb
> sudo dpkg -i node_0.10.36_armhf.deb

Pour installer npm, tapez :
> sudo apt-get install npm

Vérifiez que les deux outils sont installés :
> node -v
> npm -v


## Installer Node Red

Tapez la commande :
> sudo npm install -g --unsafe-perm  node-red







# Sources
http://hallard.me/teleinfo/
https://www.tindie.com/stores/Hallard/
https://hallard.me/pitinfo/
http://nodered.org/docs/hardware/raspberrypi.html
