
# Brancher le RPi au compteur EDF 

## Principe 

On branche le RPi à un petit circuit imprimé qui permet de récupérer les informations "téléinfo" du compteur EDF.
Ensuite on analyse tout ca.

## Le circuit imprimé

Vous pouvez trouver des dongle autour de 40-50€.
Sinon, un indépendant peut vous fournir le circuit nu pour 20€ frais d'envoi compris : https://www.tindie.com/stores/Hallard/.

Une fois que vous vous êtes procuré le circuit, brancher le au port USB du RPi et connectez deux cables entre les deux fiches du circuit et les fiches `L1` et `L2` du compteur EDF.
Normalement une petite diode rouge devrait s'allumer sur le circuit s'il est bien alimenté.

# Configurer le RPi

**Dans la suite, on va considérer que le module téléinfo est relié à `/dev/ttyUSB0`**

## Désactiver le terminal via la liaison série

Tapez la commande
> sudo raspi-config

Allez dans le menu `Advanced Options`, sélectionnez `Serial` et à la question `Would you like a login shell to be accessible over serial?` sélectionnez `No` puis `Ok` et enfin `Finish`. Il est possible que vous deviez rebooter le RPi après cela.

## Configurer la connexion serial

Tapez la commande :
> stty 1200 cs7 evenp cstopb -igncr -inlcr -brkint -icrnl -opost -isig -icanon -iexten -F /dev/ttyUSB0
*(Cette opération n'est pas persistante, il faut la retaper après chaque reboot ou la mettre dans un script de démmarage)*

Vérifiez que la connexion est active avec la commande :
> sudo cat /dev/ttyUSB0

Vous devriez voir apparaître les informations qui transitent sur la liaison teleinfo.
TODO N'affiche rien

**Si ca ne marche pas, essayez avec l'outil `picocom` :**
> sudo apt-get install picocom
> sudo picocom -b 1200 -d 7 -p e -f n /dev/ttyUSB0

Vous devriez voir apparaître les informations qui transitent sur la liaison teleinfo.
TODO N'affiche rien

*(Pour sortir de `picocom`, utilisez la combinaison `CTRL+A` puis `CTRL+X`)*

# Tester la réception de messages 

## Installer NodeJS et npm

Pour installer la dernière version de nodejs, tapez les commandes suivante :
> wget http://node-arm.herokuapp.com/node_0.10.36_armhf.deb
> sudo dpkg -i node_0.10.36_armhf.deb

Pour installer npm, tapez :
> sudo apt-get install npm

Vérifiez que les deux outils sont installés :
> node -v
> npm -v

## Ecrire un script de lecture

Créer un répertoire `teleinfo` :
> mkdir teleinfo
> cd teleinfo

Installer le module serialport :
> sudo npm install --unsafe-perm serialport --save

Créez un fichier `server.js` et éditez le :
> touch server.js
> nano server.js

Copiez le contenu suivant :

```javascript
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyUSB0", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 1200
});

sp.on("open", function() {
  console.log('open');
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
});
```

Lancez le script :
> sudo node server.js

Vous devriez voir apparaître les informations qui transitent sur la liaison teleinfo.
TODO N'affiche rien

# Sources
http://hallard.me/teleinfo/
https://www.tindie.com/stores/Hallard/
https://hallard.me/pitinfo/
http://hallard.me/gestion-de-la-teleinfo-avec-un-raspberry-pi-et-une-carte-arduipi/
http://gaelbillon.com/un-module-nodejs-pour-lire-les-donnees-du-port-serie/
