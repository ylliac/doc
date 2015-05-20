
# Installer une Raspbian sur le RPi

## Formatter la carte SD

Télechargez l'outil de formattage ici : https://www.sdcard.org/downloads/formatter_4/.
Installez le et lancez le.

Cliquez sur le bouton `Option` et saisissez les paramètres suivants :
- FORMAT TYPE : QUICK
- FORMAT SIZE ADJUSTMENT : ON

Choisissez la lettre de la carte SD et cliquez sur le bouton `Format`.

## Récupérer NOOBS

Télécharger le fichier à l'adresse suivante : http://downloads.raspberrypi.org/NOOBS_latest.

Décompressez l'archive et copiez la sur la carte SD.

## Configurer l'installation automatique de NOOBS

Allez dans le dossier `/os` et supprimez tous les dossiers qui ne nous intéressent pas pour ne laisser que l'OS que l'on veut installer.
Par exemple, pour installer une Raspbian avec NOOBS 1.4.1, j'ai uniquement supprimé le dossier `Data_Partition`.

Ensuite, éditez le fichier `flavours.json` de l'OS et supprimez tous les choix excepté celui qui nous intéresse.
Par exemple, j'ai supprimé le choix `Raspbian - Boot to Scratch` pour ne laisser que le choix `Raspbian`.

Enfin, éditez le fichier `recovery.cmdline` qui se trouve à la racine pour ajouter les arguments suivants :
- `lang=fr`
- `keyboard=fr`
- `silentinstall`

Dans mon exemple, le contenu du fichier était le suivant :
> runinstaller quiet vt.cur_default=1 elevator=deadline lang=fr keyboard=fr silentinstall


## Lancer l'installation

Mettez la carte SD dans le RPi.
Branchez le à la box en Ethernet.
Branchez l'alimentation... et attendez.

## Ping !

Une petite heure plus tard vous devriez pouvoir pinger le RPi en cherchant sur la plage d'adresses IP attribuée par votre box.

## Se connecter en SSH

Téléchargez MobaXTerm à l'adresse suivante : http://mobaxterm.mobatek.net/.
Créez une session SSH en rentrant les paramètres suivant :
- Remote host : ->adresse IP sur laquelle vous pingez le RPi<-
- Specify username : pi
- Port : 22

## Configurer le RPi

Tapez `sudo raspi-config`.


## Configurer le Wifi

Editez le fichier /etc/network/interfaces :
> sudo nano /etc/network/interfaces

... et saisissez les informations suivantes :
> auto lo
> iface lo inet loopback
> 
> auto eth0
> allow-hotplug eth0
> iface eth0 inet manual
> 
> auto wlan0
> allow-hotplug wlan0
> iface wlan0 inet dhcp
> wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
> iface default inet dhcp

Editez ensuite le fichier /etc/wpa_supplicant/wpa_supplicant.conf
> sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

... et saisissez les informations suivantes :
> ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
> update_config=1
> 
> network={
> ssid="freebox_VDFIYA"
> psk="mirabeau"
> 
> # Protocol type can be: RSN (for WP2) and WPA (for WPA1)
> proto=WPA
> 
> # Key management type can be: WPA-PSK or WPA-EAP (Pre-Shared or Enterprise)
> key_mgmt=WPA-PSK
> 
> # Pairwise can be CCMP or TKIP (for WPA2 or WPA1)
> pairwise=TKIP
> 
> #Authorization option should be OPEN for both WPA1/WPA2 (in less commonly used are SHARED and LEAP)
> auth_alg=OPEN
> }

Maintenant redémarrez et allez vite débrancher le cable ethernet !
> sudo reboot

## Sources

http://www.framboise314.fr/demarrez-votre-framboise314-au-quart-de-tour-noobs-pour-le-raspberry-pi/
https://github.com/raspberrypi/noobs#how-to-automatically-install-an-os
https://github.com/raspberrypi/noobs#how-to-change-the-default-language-keyboard-layout-display-mode-or-boot-partition
http://techtach.com/2014/12/setup-raspberry-pi-b-without-display-and-keyboard-complete-guide/
http://www.howtogeek.com/167425/how-to-setup-wi-fi-on-your-raspberry-pi-via-the-command-line/








