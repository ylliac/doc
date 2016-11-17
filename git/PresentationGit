# Presentation Git



## Installer git

Télécharger et installer depuis https://git-scm.com/.

Configuration minimale :

- `$ git config --global user.name votre_nom`
  - pour vérifier : `$ git config --get user.name`
- `$ git config --global user.email votre_email`
  - pour vérifier : `$ git config --get user.email`



## Pourquoi Git ?



### Décentralisé

![archi](schema_archi.PNG)

- On peut mettre en place du versionning local à moindre coût (git init)
- Moins d'accès réseau (commits locaux)
- Possibilité d'avoir des organisations avec plusieurs repositories publics 
  - 1 biomerieux, 1 shared avec BioFire (GeneUp)
  - 1 public, 1 par développeur (PR dans Github)
  - Dictateur bienveillant (Kernel linux)
    - 1 par développeur
    - 1 par lieutenant, chacun intégrant le travail d'un groupe de developpeurs
    - 1 dictateur bienveillant qui intègre le travail des lieutenants et le publie



### Performant 

Git indexe le contenu complete des fichiers et non une succession de delta depuis la version d'origine.

La reconstruction de l'état précédent d'un fichier est quasi instantané.



#### Ca prend pas trop de place ?

Il y a déjà une optimisation : si deux commits différent pointent vers deux fichiers avec le même contenu, ce contenu ne sera stocké qu'une seule fois en base (et ce même si les deux fichiers n'ont pas le même nom)

De plus, de temps en temps git optimise l'index pour économiser de la place (en calculant des deltas mais de manière optimisée).



### Sécurisé

Il est très rare de supprimer quelque chose dans Git. Même si un commit n'apparait plus dans l'arbre, il y a de grande chance qu'il soit encore accessible.

La commande `reflog` permet de lister l'historique des opération et ainsi de retrouver le commit sur lequel on se trouvait précédemment.



## La ligne de commande

- Claire
- Guide l'utilisateur sur les actions possibles
- Autocomplétion dans Git Bash



## Versionner des fichiers en local

### Créer un repository git

```shell
$ git init monrepo
$ cd monrepo
```

Le dossier `monrepo` contient un répertoire `.git`, c'est la base de données de git.

La commande `git status` n'affiche aucun changement :

```shell
$ git status
On branch master
Initial commit
nothing to commit (create/copy files and use "git add" to track)
```



### Les 3 zones

![zones](schema_zones.png)

- Le repository
  - contient tous les changements commités
- Staging area ou Index
  - contient les changements sélectionnés pour le prochain commit
- Working dir 
  - contient les changements non sélectionnés pour le prochain commit

**Une modification est donc d'abord sélectionnée (ou indexée) puis commitée.**

### Créer un fichier et le versionner

Créer un fichier.

```shell
$ echo TOTO > TOTO.txt
$ git status
On branch master
Initial commit
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        TOTO.txt
nothing added to commit but untracked files present (use "git add" to track)
```

Le fichier est dans l'état **untracked**, il n'est pas dans la base de Git, il n'est pas versionné.

Git nous dit qu'il faut utiliser `git add`.

```bash
$ git add TOTO.txt
warning: LF will be replaced by CRLF in TOTO.txt.
The file will have its original line endings in your working directory.
```

Sous Windows, Git remplace automatiquement les sauts de ligne Linux (LF) en sauts de ligne Windows (CRLF) quand il extrait des fichiers de la base Git et fait l'opération inverse quand il les réintègre, d'où le warning.

### Premier commit

```shell
$ git status
On branch master
Initial commit
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   TOTO.txt
```

Le fichier est dans l'état **staged** ou **indexed**, cela signifie que l'ajout du fichier a été sélectionné pour le prochain commit.

Pour commiter, on utilise `git commit -m "Message"` :

```shell
$ git commit -m "Ajout de TOTO.txt"
[master (root-commit) 6fee1f4] Ajout de TOTO.txt
 1 file changed, 1 insertion(+)
 create mode 100644 TOTO.txt
```

### Historique des commits

Après le commit, il n'y a plus de changement en cours :

```shell
$ git status
On branch master
nothing to commit, working tree clean
```

Pour afficher l'historique des commits effectués, on utilise `git log` :

```shell
$ git log
commit 6fee1f46146ee88eb2a1ad5f79c8d93b62d89f25
Author: acailly <antoine.cailly@ext.biomerieux.com>
Date:   Wed Nov 16 14:42:25 2016 +0100
    Ajout de TOTO.txt
```

Pour afficher un log plus lisible quand il y a plusieurs commit on peut utiliser la commande suivante :

```shell
$ git log --all --oneline --graph --decorate
* 6fee1f4 (HEAD -> master) Ajout de TOTO.txt
```

- --all : affiche tous les commits, pas seulement ceux de la branche courante
- --oneline : affiche chaque commit sur une ligne
- --graph : quand il y a plusieurs branches, dessines un graphique pour les visualiser 
- --decorate : ajoute le nom des branches et tags à côté des commits correpsondant



Pour aller plus vite vous pouvez ajouter un alias :

```shell
$ git config --global alias.glog "log --all --oneline --graph --decorate"
$ git glog
* 6fee1f4 (HEAD -> master) Ajout de TOTO.txt
```





### Modifier un fichier 

```shell
$ echo "Suite de TOTO" >> TOTO.txt
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
        modified:   TOTO.txt
no changes added to commit (use "git add" and/or "git commit -a")
```

Le fichier est dans l'état **not staged** ou **not indexed**. Il n'est pas sélectionné pour le prochain commit. Il n'est pas dans l'état *unindexed* car il a déjà été ajouté dans la base de Git.

Git nous dit que : 

- pour le sélectionner, on doit taper `git add TOTO.txt`
- pour annuler la modification et revenir à l'état du dernier commit, on doit taper `git checkout -- TOTO.txt`



### Suppression du fichier

```shell
$ rm TOTO.txt
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
        deleted:    TOTO.txt
no changes added to commit (use "git add" and/or "git commit -a")
```

On peut sélectionner la suppression pour le prochain commit en tapant `git add TOTO.txt`.

On peut aussi utiliser la commande `git rm TODO.txt` qui effectue un `rm TOTO.txt` suivi de `git add TOTO.txt` en une seule commande.



### Le dossier .git = le repo

Annuler la suppression :

```shell
$ git checkout TOTO.txt
$ git status
On branch master
nothing to commit, working tree clean
```

Copier le dossier `.git` dans un nouveau dossier vide.

```shell
$ mkdir ../monrepo2
$ cp -r .git ../monrepo2/
```

Aller dans le dossier `monrepo2` et afficher le status :

```shell
$ cd ../monrepo2/
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
        deleted:    TOTO.txt
no changes added to commit (use "git add" and/or "git commit -a")
```



## Les références

### Les branches

```shell
$ git glog
* 6fee1f4 (HEAD -> master) Ajout de TOTO.txt
$ git branch feature1
$ git glog
* 6fee1f4 (HEAD -> master, feature1) Ajout de TOTO.txt
```

La branche `feature1` a été ajouté sur le commit courant, c'est une simple étiquette qui a été ajouté.

**Aucune copie de code n'a été effectuée.**

Les informations d'une branche sont son nom et le commit associé. Elle est stockée dans `.git/refs/heas/feature1` :

```shell
$ cat .git/refs/heads/feature1           <--nom
6fee1f46146ee88eb2a1ad5f79c8d93b62d89f25 <--commit
```

Pour connaitre les branches situées sur le commit courant, on peut taper :

```shell
$ git branch
  feature1
* master
```

Ici on voit que deux branches sont sur le commit courant : `master` (la branche créée par défaut) et `feature1`. 

L'étoile indique que nous sommes actuellement sur `master`.

Pour changer de branche on utilise :

```shell
$ git checkout feature1
Switched to branch 'feature1'
$ git branch
* feature1
  master
```

Pour créer une nouvelle branche et aller dessus en une seule opération on peut faire :

```shell
$ git checkout -b feature2
Switched to a new branch 'feature2'
$ git branch
  feature1
* feature2
  master
```



### HEAD

C'est une référence spéciale indiquant le commit ou la branche courante.

```shell
$ cat .git/HEAD
ref: refs/heads/feature2
```

Quand HEAD pointe sur un commit et non une branche, on parle de **detached HEAD**.

```shell
$ git checkout 6fee1f4
Note: checking out '6fee1f4'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:
  git checkout -b <new-branch-name>
HEAD is now at 6fee1f4... Ajout de TOTO.txt
$ git branch
* (HEAD detached at 6fee1f4)
  feature1
  feature2
  master
```

Dans cette situation, si un commit est ajouté dans une des branches *master*, *feature1* ou *feature2*, celle ci pointera vers ce nouveau commit alors que *HEAD* pointera toujours vers le commit *6fee1f4*.



### Tags

Les tags sont similaires aux branches à l'exception qu'ils restent attachés au commit auquel ils ont été ajoutés.

```shell
$ git tag simple_tag
$ git glog
* 6fee1f4 (HEAD, tag: simple_tag, master, feature2, feature1) Ajout de TOTO.txt
```

```shell
$ git tag -a -m "Message" annotated_tag
$ git glog
* 6fee1f4 (HEAD, tag: simple_tag, tag: annotated_tag, master, feature2, feature1) Ajout de TOTO.txt
```

```shell
$ git show annotated_tag
tag annotated_tag
Tagger: acailly <antoine.cailly@ext.biomerieux.com>
Date:   Wed Nov 16 15:30:28 2016 +0100
Message
commit 6fee1f46146ee88eb2a1ad5f79c8d93b62d89f25
Author: acailly <antoine.cailly@ext.biomerieux.com>
Date:   Wed Nov 16 14:42:25 2016 +0100
    Ajout de TOTO.txt
diff --git a/TOTO.txt b/TOTO.txt
new file mode 100644
index 0000000..379e8b0
--- /dev/null
+++ b/TOTO.txt
@@ -0,0 +1 @@
+TOTO
```

```shell
$ cat .git/refs/tags/annotated_tag
9b55e688f700db4ed53981d86e59f141f540c29a
```



## Travailler avec les autres

### Cloner un repository distant

``` shell
$ cd ..
$ git clone ./monrepo monrepo2
$ cd monrepo2
```

On peut cloner un dossier ou une URL (par exemple l'adresse d'un repository Bitbucket).



### Remote add

Si vous avez un répertoire de travail local et que vous souhaitez le brancher à un repository distant :

```shell
$ cd ..
$ git init monrepo3
Initialized empty Git repository in C:/Projets/exp/monrepo3/.git/
$ cd monrepo3
$ git remote add origin ../monrepo
$ git remote -v
origin  ../monrepo (fetch)
origin  ../monrepo (push)
```

Le repository qui vient d'être ajouté a été baptisé `origin`. C'est le nom utilisé par défaut quand on fait un `git clone`.

### Récupérer les changements depuis le repository distant

```shell
$ git fetch --all
Fetching origin
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 4 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (4/4), done.
From ../monrepo
 * [new branch]      feature1      -> origin/feature1
 * [new branch]      feature2      -> origin/feature2
 * [new branch]      master        -> origin/master
 * [new tag]         annotated_tag -> annotated_tag
 * [new tag]         simple_tag    -> simple_tag
```

L'opération `git fetch` ne **modifie pas les fichiers en local**, elle ne fait que récupérer les informations depuis le repository distant (ces informations sont stockées dans le dossier .git).



### Rapatrier les changements depuis le repository distant

```shell
$ git merge origin/master
$ git branch
* master
$ git glog
* 6fee1f4 (HEAD -> master, tag: simple_tag, tag: annotated_tag, origin/master, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

La branche `origin/master` indique la position de la branche `master` sur le repository distant nommé `origin`.



### Le pull

La commande `pull` équivaut à appeller `fetch` puis `merge`.

La commande `rebase` sera appelée à la place de `merge` si :

- on ajoute l'argument `--rebase`
- la config `pull.rebase` est *true*



Si la différence entre `fetch` et `pull` n'est pas claire, utilisez `fetch` puis `merge ` ou `rebase` suivant le résultat désiré.



### Envoyer les changements vers le repository distant 

On commence par effectuer un nouveau commit :

```shell
$ echo "Suite de TOTO" >> TOTO.txt
$ git add TOTO.txt
warning: LF will be replaced by CRLF in TOTO.txt.
The file will have its original line endings in your working directory.
$ git commit -m "Suite de TOTO"
[master 38e1228] Suite de TOTO
 1 file changed, 1 insertion(+)
$ git glog
* 38e1228 (HEAD -> master) Suite de TOTO
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/master, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

Ensuite on envoit ce commit sur le serveur distant :

```shell
$ git push origin master
Counting objects: 3, done.
Writing objects: 100% (3/3), 269 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To ../monrepo
   6fee1f4..38e1228  master -> master
$ git glog
* 38e1228 (HEAD -> master, origin/master) Suite de TOTO
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

La branche `origin/master` a été déplacée au même endroit que `master`.



## Travailler avec plusieurs branches

![merge_rebase](schema_merge_rebase.PNG)

### Fusionner des branches (Merge)

On créé une modification sur la branche `feature1` :

```shell
$ git checkout feature1
Branch feature1 set up to track remote branch feature1 from origin.
Switched to a new branch 'feature1'
$ echo "Suite différente de TOTO" >> TOTO.txt
$ git add TOTO.txt
warning: LF will be replaced by CRLF in TOTO.txt.
The file will have its original line endings in your working directory.
$ git commit -m "Suite différente de TOTO"
[feature1 ceb164e] Suite différente de TOTO
 1 file changed, 1 insertion(+)
$ git glog
* ceb164e (HEAD -> feature1) Suite différente de TOTO
| * 38e1228 (origin/master, master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

On décide ensuite de rappatrier le contenu de `feature1` dans `master` :

```shell
$ git checkout master
Switched to branch 'master'
$ git merge feature1
Auto-merging TOTO.txt
CONFLICT (content): Merge conflict in TOTO.txt
Automatic merge failed; fix conflicts and then commit the result.
```

L'opération a échouée car le contenu du fichier TOTO.txt était différent dans ces deux branches.

La commande `git status` nous indique quoi faire :

```shell
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   TOTO.txt
no changes added to commit (use "git add" and/or "git commit -a")
```

Git nous dit de :

- résoudre les conflit
- taper `git add TOTO.txt` pour marquer le fichier comme correct
- taper `git commit` pour finir le merge

Pour résoudre le conflit sur `TOTO.txt`, il suffit d'ouvrir le fichier dans un éditeur de texte :

```shell
$ cat TOTO.txt
TOTO
<<<<<<< HEAD
Suite de TOTO
=======
Suite différente de TOTO
>>>>>>> feature1

```

Les conflits sont encadrés par `<<<` et `>>>` et chaque version est séparée par une ligne `===`.

Ici on voit que la deuxième ligne est en conflit, on choisie la version qu'on veut conserver :

```shell
$ vim TOTO.txt
$ cat TOTO.txt
TOTO
Suite de TOTO légèrement adaptée
```

Et on termine le merge :

```shell
$ git add TOTO.txt
$ git commit
[master 0068d53] Merge branch 'feature1'
$ git glog
*   0068d53 (HEAD -> master) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

Le `merge` a eu pour effet d'ajouter un commit au dessus des deux branches fusionnées.



### Merge Fast Forward

Essayons de merger `master` dans `feature2` et observons le résultat :

```shell
$ git checkout feature2
Branch feature2 set up to track remote branch feature2 from origin.
Switched to a new branch 'feature2'
$ git merge master
Updating 6fee1f4..0068d53
Fast-forward
 TOTO.txt | 1 +
 1 file changed, 1 insertion(+)
$ git glog
*   0068d53 (HEAD -> feature2, master) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

Ici il était possible de rappatrier le contenu de `master` dans `feature2` simplement en montant la référence de `feature2` au même niveau que `master` car tous les commits présents dans `feature2` étaient également présents dans `master`.

C'est ce qu'on appelle le **fast-forward**, cela évite de créer un commit dédié au merge quand c'est inutile.



### Rebase

On va créer une branche `feature3` qui reproduit la même situation que `feature1` avant le merge :

```shell
$ git branch feature3 6fee1f4
$ git glog
*   0068d53 (HEAD -> feature2, master) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1, feature3) Ajout de TOTO.txt
$ git checkout feature3
Switched to branch 'feature3'
$ echo "Suite de TOTO encore différente" >> TOTO.txt
$ git add TOTO.txt
warning: LF will be replaced by CRLF in TOTO.txt.
The file will have its original line endings in your working directory.
gi
$ git commit -m "Suite de TOTO encore différente"
[feature3 d448b14] Suite de TOTO encore différente
 1 file changed, 1 insertion(+)
$ git glog
* d448b14 (HEAD -> feature3) Suite de TOTO encore différente
| *   0068d53 (master, feature2) Merge branch 'feature1'
| |\
| | * ceb164e (feature1) Suite différente de TOTO
| |/
|/|
| * 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

Au lieu de merger le contenu de `feature3` dans `master`, on va copier ses commits au dessus de ceux de master avec la commande `git rebase --onto branche_cible <from> <to>` :

```shell
$ git rebase --onto master master feature3
First, rewinding head to replay your work on top of it...
Applying: Suite de TOTO encore différente
Using index info to reconstruct a base tree...
M       TOTO.txt
Falling back to patching base and 3-way merge...
Auto-merging TOTO.txt
CONFLICT (content): Merge conflict in TOTO.txt
error: Failed to merge in the changes.
Patch failed at 0001 Suite de TOTO encore différente
The copy of the patch that failed is found in: .git/rebase-apply/patch
When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
$ git status
rebase in progress; onto 0068d53
You are currently rebasing branch 'feature3' on '0068d53'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)
Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)
        both modified:   TOTO.txt
no changes added to commit (use "git add" and/or "git commit -a")
```

Nous sommes dans la même situation qu'avec le merge de `feature1`, sauf que la façon de résoudre le conflit est différente.

Git nous dit qu'il faut :

- Résoudre le conflit
- Taper `git rebase --continue`
- Recommencer tant qu'il y a des conflit

```shell
$ cat TOTO.txt
TOTO
<<<<<<< HEAD
Suite de TOTO
=======
Suite de TOTO encore différente
>>>>>>> Suite de TOTO encore différente
$ vim TOTO.txt
$ cat TOTO.txt
TOTO
Suite de TOTO encore différente mais légèrement adaptée
$ git add TOTO.txt
$ git rebase --continue
Applying: Suite de TOTO encore différente
```

```shell
$ git glog
* 1efc60d (HEAD -> feature3) Suite de TOTO encore différente
*   0068d53 (master, feature2) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

On voit que la branche `feature3` est maintenant sur la même ligne que la branche `master`, contrairement à la branche `feature1` qui a été mergée et non rebasée.



### Merge VS Rebase

#### Merge 

- Tracabilité : aucun commit n'est détruit
- Sécurité : aucun risque de mauvaise manipulation

#### Rebase 

- Clarté : permet d'avoir un historique plus linéaire et épuré
- Opération destructive potentiellement risquée
- **Golden rule : ne pas rebaser une branche publique !**


### Stash

Il arrive que la commande `rebase` refuse de s'exécuter parce que vous avez des changements en local qui ne sont pas commités.

Une solution consiste à les enlever de votre répertoire de travail pour les mettre dans une zone temporaire appelée **stash** à l'aide de la commande `git stash`.

Après l'opération de *rebase*, vous pouvez récupérer votre travail en cours avec la commande `git stash pop`.



### Rebase interactif

(`master~2` désigne le deuxième ancêtre, le grand père, du commit pointé par `master`)

Que fait la commande `git rebase --onto master~2 master~2 master` ?

Elle copie les deux derniers commits de master pour les copier sur master... en fait ca n'a aucun effet.

Mais l'option `-i`, pour **interactif**, permet de faire des modifications des commits copiés avant de les remettre sur master... en fait cela permet de réécrire l'historique des deux derniers commits de master.

Par exemple, créons deux modifications :

```` shell
$ echo TITI > TITI.txt
$ git add TITI.txt
warning: LF will be replaced by CRLF in TITI.txt.
The file will have its original line endings in your working directory.
$ git commit -m "Ajout de TITI"
[master deb5638] Ajout de TITI
 1 file changed, 1 insertion(+)
 create mode 100644 TITI.txt
$ echo TITI; > TITI.txt
TITI
$ cat TITI.txt
$ echo "TITI;" > TITI.txt
$ cat TITI.txt
TITI;
$ git add TITI.txt
warning: LF will be replaced by CRLF in TITI.txt.
The file will have its original line endings in your working directory.
$ git commit -m "Oups, j'avais oublié un point virgule"
[master c0b3005] Oups, j'avais oublié un point virgule
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git glog
* c0b3005 (HEAD -> master) Oups, j'avais oublié un point virgule
* deb5638 Ajout de TITI
| * 1efc60d (feature3) Suite de TOTO encore différente
|/
*   0068d53 (feature2) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
````

On va utiliser le rebase interactif pour fusionner les deux commits :

```shell
git rebase -i --onto master~2 master~2 master
```

Le fichier suivant s'ouvre :

```shell
pick deb5638 Ajout de TITI
pick c0b3005 Oups, j'avais oublié un point virgule

# Rebase 0068d53..c0b3005 onto c0b3005 (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Remplaçons le mot clé `pick` en face du commit *c0b3005* par `fixup` puis enregistrons les modifications :

```shell
$ git rebase -i --onto master~2 master~2 master
Successfully rebased and updated refs/heads/master.
$ git glog
* 946c28d (HEAD -> master) Ajout de TITI
| * 1efc60d (feature3) Suite de TOTO encore différente
|/
*   0068d53 (feature2) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

Le second commit a disparu, mais le point virgule est bien présent dans `TITI.txt` :

```shell
$ cat TITI.txt
TITI;
```

**Rappel : pas de rebase sur les branches publiques**

### Revert

Si on ne peut pas rebaser une branche publique, comment fait on pour supprimer un commit qui a déjà été poussé ?

La réponse : utiliser la commande `revert` qui va commiter le commit inverse et ainsi annuler le changement sans pour autant annuler le commit original.



### Cherry pick

Supposons que je veuille **copier** un commit située sur une autre branche pour la recopier sur la branche courante :

```shell
$ git glog
* 946c28d (HEAD -> master) Ajout de TITI
| * 1efc60d (feature3) Suite de TOTO encore différente
|/
*   0068d53 (feature2) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
$ git cherry-pick 1efc6
$ git glog
[master 2bb23af] Suite de TOTO encore différente
 Date: Wed Nov 16 16:42:27 2016 +0100
 1 file changed, 1 insertion(+), 1 deletion(-)
* 2bb23af (HEAD -> master) Suite de TOTO encore différente
* 946c28d Ajout de TITI
| * 1efc60d (feature3) Suite de TOTO encore différente
|/
*   0068d53 (feature2) Merge branch 'feature1'
|\
| * ceb164e (feature1) Suite différente de TOTO
* | 38e1228 (origin/master) Suite de TOTO
|/
* 6fee1f4 (tag: simple_tag, tag: annotated_tag, origin/feature2, origin/feature1) Ajout de TOTO.txt
```

 



## Workflows



### La constante : les feature branch

Avec Git, les branches locales sont très facile à créer et la plupart des workflow incitent à créer **une branche par feature**.



### Historique plat ou tracabilité des branches ?

Utiliser `merge` pour garder la trace des développements ou `rebase` pour épurer l'historique ?

On aura tendance à garder l'historique sur les branches de développement et à l'épurer sur les branches de release, mais il n'y a pas de bonne façon de faire, cela dépend du contexte.



### Combien de branches ?

Est ce que je dois mettre une branche pour le dev, une pour les releases, une pour la pré-prod, une pour la prod...

La encore cela dépend du contexte. La bonne approche est d'ajouter des branches quand elles deviennent nécessaires.



### Où est la branche master ?

Est ce que master est la branche de dev, la branche de prod... ?

Pour simplifier la vie des développeurs il est conseillé d'utiliser master comme branche de dev mais la encore il n'y a pas de règle et cela dépend du contexte.



### Les hotfixes

Que faire quand on se rend compte d'un bug en prod ?

- Niveau 0 : écrire deux fois le correctif, une fois dans la branche de prod, une fois dans la branche de dev
- Niveau 1 : écrire une fois le correctif et faire un `cherry-pick` dans l'autre branche
  - Inconvénient : le cherry-pick ne créé pas de relation entre le commit initial et le commit copié
- Niveau 2 : écrire le correctif dans une branche *hotfixes* et le merger dans la branche dev et prod
  - L'historique est ainsi conservé



### Les pull request

Le mécanisme de pull request, aussi appelé merge request suivant les outils, permet à un développeur de proposer l'intégration d'une branche dans une autre branche en passant par une étape de validation par un tiers.

Cela permet :

- de s'assurer que chaque développeur créé bien une branche par feature
- de faire du code review
- de vérifier la qualité du code proposé
- de garder une trace des discussions autour d'une feature



C'est le mécanisme utilisé pour contribuer aux projets open source.





## Différents modes d'accès aux repository distants

### File system

Les exemples précédents clonent un repository situé dans un autre dossier.

Le chemin du dossier sert d'addresse.

### HTTPS

Souvent utilisée pour donner les droits en lecture à tout le monde.

En cas d'écriture, un login / mot de passe sera demandé et l'écriture ne sera autorisée que si le compte correspondant a les droits suffisants.

### SSH

Méthode la plus fiable, utilisée au sein d'un projet.

Un couple clé privée / clé publique est générée, la clé publique est enregistrée auprès du serveur distant et associée à un utilisateur, la clé publique remplace en quelque sorte le mot de passe de l'utilisateur.

La clé privée est conservée par le développeur.



#### Configurer avec OpenSSH

Vérifiez que vous n'avez pas déjà une clé :

```shell
$ ls ~/.ssh
id_rsa  id_rsa.pub  known_hosts
```

Si vous voyez un fichier `something` et `something.pub` il s'agit probablement d'une clé.

Sinon, tapez la commande `ssh-keygen` :

```shell
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/u//.ssh/id_rsa): test
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in test.
Your public key has been saved in test.pub.
The key fingerprint is:
SHA256:WmRpPzFrbz3OeQruua00dtyclelS/w1Mo1pgIkUzffM 90021245@FRL068021
The key's randomart image is:
+---[RSA 2048]----+
|        +.       |
|       . +. o    |
|        * o. o   |
|       = . +  E o|
|      . S B   o+.|
|       + + + *o++|
|      .     X.Bo+|
|           B O.++|
|          ..*o*oo|
+----[SHA256]-----+
$ ls
test  test.pub
```

(Note : pour que Git détecte votre clé automatiquement, il est conseillé de la générer dans le répertoire proposé par défaut, `~/.ssh/id_rsa`)

Une fois la clé générée, copiez son contenu dans votre profil utilisateur Github, Gitlab ou Bitbucket :

```shell
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABJTOTOTOTOTOTO1llw/xmeqhKMtEpdGs8wRPp6nkvGMelU9V2SMh+yujdIsTP4WZNg5I26L9dt8cM1wPPbGMk61KhnZ2s/9apLy5cnfrm2PwCjBqO7GzcxhvEhuCqxE/G+O+Srk3vhTAbYWlcEpCji6WzsUiSqOfWO8vmhzTRUbApmaRaRvqgHQviY1ML08ku9LT8nKv4gbp7/P6qLp8gcAHaNni7OYiC4B9qMH2qNV1k8mO4b2mozWBU9WRRUyqyjSD9VHJAbVtqkGNqkG9RYeCsLIEmp4eqNBQXcg7F42BF8qDTNCy+mSH2HTcnz90Cuqbh6TPt/iEULGGxZa2IN67rQenV7Q== rsa-key-20151123
```



#### Et Putty ?

Utilisez OpenSSH ;)



## Outils graphiques

Outils généralistes :

- Commandes `git gui` et `gitk`
- Git Extensions : https://gitextensions.github.io/
- SourceTree : https://www.sourcetreeapp.com/
- GitKraken : https://www.gitkraken.com/



## Hooks



Il s'agit de scripts que l'on peut mettre dans son repo local ou sur un serveur distant. Ils permettent d'exécuter du code au moment d'actions importantes.

Ils se situent dans le dossier `.git/hooks`. Plusieurs exemples sont ajoutés à l'installation de Git, il suffit d'enlever l'extension `.sample` pour les activer.

**Les hooks locaux ne sont pas partagé entre tous les développeurs, pour cela il est préférable d'utiliser les hooks sur le serveur distant**.

Exemple de hooks coté client :

- `pre-commit` : utile pour vérifier le style du code avant le commit
- `commit-msg` : utile pour valider le format du message de commit

Exemple de hooks coté serveur :

- `update` : exécuté au moment ou un utilisateur essaie de pousser du code, utile pour vérifier que certaines regles sont respectées
- `post-receive` : utile pou exécuter une action après un envoit sur le serveur, par exemple envoyer un mail ou déclencher un build



Pour un exemple complet : https://git-scm.com/book/fr/v2/Personnalisation-de-Git-Exemple-de-politique-g%C3%A9r%C3%A9e-par-Git#_an_example_git_enforced_policy





## Git Large File Storage (LFS) pour gérer les fichiers binaires

https://git-lfs.github.com/

Répond à la question : commment gérer des fichiers binaires ?

Stocke des raccourcis vers les fichiers binaires  plutot que les fichiers binaires eux mêmes. Les fichiers binaires sont stockés dans un espace de stockage dédié.

Le developpeur voit ainsi les fichiers binaires comme s'ils étaient stockés dans le repo Git.

**Il faut installer l'extension avant de cloner le repo sous peine de récupérer les raccourcis plutot que les binaires**

**Il faut également utiliser `git lfs clone` au lieu de `git clone` pour des raisons de performance**

Les paramètres liés aux extensions gérées par Git LFS sont stockées dans le fichier `.gitattributes` dans le dossier du projet.

**Conseil :** quand on ajoute un nouveau type de fichier à tracker avec `git lfs track ".ext"`, faire un commit avant d'ajouter un fichier de ce type.



### Comment faire en sorte qu'un repo existant utilise LFS ?

https://confluence.atlassian.com/bitbucket/reduce-repository-size-321848262.html

https://rtyley.github.io/bfg-repo-cleaner/



## FAQ 



### Détailler le contenu du dossier `.git`

```
# Contenu de .git
HEAD
ORIG_HEAD
index
config*
description
logs/
hooks/
info/
objects/
refs/
```

Peu intéressant :

- `description` : utilisé par gitweb, pas intéressant
- `config` : configuration propre au projet
- `info` : contient un fichier `exclude` permettant de faire la même chose que `.gitignore` mais sans le partager, peu utilisé

Outils :

- `hooks` : contient les hooks

Fonctionnement interne :

- `HEAD` : Stocke la référence sur la branche ou le commit dernièrement récupéré
- `ORIG_HEAD` : Stocke contient la sauvegarde de `HEAD` effectuée par Git avant une opération *dangereuse* (merge, pull...)
  - Permet d'utiliser `git reset ORIG_HEAD` en cas de problème
- `objects` : Stocke le contenu de la base de données
- `refs` : Stocke les étiquettes (n° de commit) des tags (`tags`), des branches (`heads`) et des remotes (`remotes`)
- `index` : Stocke les informations sur la staging area
- `logs` : Stocke l'historique des références, accessible via `git reflog`





### Si Git stocke tout le contenu du fichier à chaque modification, pourquoi la taille de la base n'explose pas ?

De temps en temps, Git optimise la base de donnée en lançant un **packfile**.

Cela a pour effet de supprimer la plupart des entrées de `objects` et de les placer dans une version optimisée dans `packs`. 

Cette commande peut être appelée manuellement avec `git gc`.

Elle a pour effet de repérer les fichier nommés de la même façon et avec des tailles proches et de ne stocker que le delta entre deux versions. La version dont le contenu entier est conservée est la version la plus récente car c'est la plus succeptible d'être utilisée.



### Question : quand pusher ? tous les jours ? à la fin d'une feature ? autre ?

Risques à prendre en compte :

- risque de perte du travail (crash pc, congé maladie...)
- risque de perte de lisibilité du graph de commit

Dépend de la politique interne :

- accepte t'on de casser le build ?
- accepte t'on de casser les tests ?
- accepte t'on d'inclure une fonctionnalité partielle ?

A priori non avec une logique mono branche mais avec des branches séparées de la branche principale c'est envisageable.



### Que faire si je ne suis pas sur ?

Cloner le repo local en local et jouer avec



### Pourquoi ne pas faire de rebase sur une branche pushée ?

Parce que rebase est une opération destructrice et que vous risquez d'altérer des commits et des branches qui sont présent chez vos collègues.



### Est ce que le stash sauvegarde les fichiers non tracké?

stash par défaut sauvegarde les modifications non indexés mais pas les fichiers non trackés

pour les sauvegarder, il faut utiliser --include-untracked

pour également sauvegarder les fichiers ignorés, utiliser --all



### Si on a un commit qui vient corriger le commit précédent, comment les regrouper en un seul ?

```shell
$ git rebase -i HEAD~2
```

puis marquer le commit à de correction comme `fixup`



### Comment éviter d'avoir à faire un `add` puis un `commit` à chaque fois ?

`git commit -am "Message"` ne commitera pas les fichiers non trackés

 Il n'y a pas de commande unitaire pour effectuer la commande git add -A && git commit -m Message

Une solution peut être de définir un alias :

```shell
$ git config --global alias.add-commit '!git add -A && git commit'
$ git add-commit -m Message
```



### Si je supprime un fichier dans l'explorateur ou avec `rm FICHIER.txt`, comment annuler cette modification ?

```shell
$ git checkout -- FICHIER.txt
```



### Et si j'ai indexé cette suppression avec `git rm` ou `git add` ?

```shell
$ git reset -- FICHIER.txt
```



### Différence entre git reset --hard, --mixed et --soft ?

Soit un commit ajoutant un fichier `File.txt`.

--hard va supprimer le fichier `File.txt` du disque 

--soft va placer le fichier `File.txt` dans les changement à commiter (staging area)

--mixed va placer le fichier `File.txt` dans les changement non indexé (working dir)



### La fonction `commit --amend` peut elle marcher sur un autre commit que le dernier d'une branche ?

Non, utiliser rebase -i dans ce cas



## Ressources utiles

Le Git Book : https://git-scm.com/book/fr/v2

- Trame pédagogique adaptée à tous niveaux
- Permet de creuser dans les entrailles de Git pour les plus curieux
- Traduit en français



Un serious game : http://learngitbranching.js.org/

