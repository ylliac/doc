
# Faire du RPi une borne Airplay

## Prérequis

Installez les modules suivants :
> sudo apt-get install  libao-dev libssl-dev git avahi-utils libwww-perl  
> sudo apt-get install libcrypt-openssl-rsa-perl libio-socket-inet6-perl  libmodule-build-perl

## Récupérer le code de Shairport

Shairport est l'implémentation libre du protocole derrière Airplay. Il ne fonctionne que pour l'audio (Airplay 1.0).

Créez un dossier pour télécharger les sources :
> mkdir projects  
> cd projects  
> mkdir airplay-audio-project  
> cd airplay-audio-project  

Si vous désirez utiliser iOS 6+, exécutez les commandes suivantes **(non testé)** :
> git clone https://github.com/njh/perl-net-sdp.git  
> cd perl-net-sdp  
> perl Build.PL  
> ./Build  
> ./Build test  
> sudo ./Build install  
> cd ..  

Enfin, téléchargez les sources de Shairport depuis Git et compilez :
> git clone https://github.com/abrasive/shairport.git  
> cd shairport  
> make  
> sudo make install  

## Tester

Tapez la commande suivante :
> ./shairport -a RaspberryPi

Téléchargez ensuite un client Airplay pour votre plateforme, par exemple :
- Pour Windows : [TuneBlade](http://tuneblade.com/)
- Pour Android : [AllStream](https://play.google.com/store/apps/details?id=com.kineticgamestudios.airtunes.android)

Jouez un son sur votre PC / Smartphone et utilisez l'application que vous venez de télécharger pour envoyer le son vers le RPi.
Vous devriez entendre le son sur les enceintes auxquelles vous avez connecté le RPi.

## Faire en sorte que Shaiport se lance au démarrage

Tapez les commandes suivantes :
> sudo cp scripts/debian/init.d/shairport /etc/init.d/shairport  
> sudo chmod +x /etc/init.d/shairport  
> sudo update-rc.d shairport defaults  

... et redémarrez le RPi :
> sudo reboot


# Sources

http://raspberrypihq.com/how-to-turn-your-raspberry-pi-into-a-airplay-receiver-to-stream-music-from-your-iphone/













