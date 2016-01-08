
# Mettre en place Webdriver.io 

 ##Télécharger Java 

Télecharger la dernière version du JDK : http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html.

## Télécharger Selenium Standalone 

> npm install -g selenium-standalone

> selenium-standalone install

## Télécharger Webdriver.io 

> npm install -g webdriverio

## Configurer le projet 

> wdio config

Choisissez les options que vous préférez, par exemple :
- jasmine comme framework de test
- spec comme reporter

## Installer le framework de test 

> npm install -g jasmine

## Ecrire un test 

Créer un fichier login.spec.js :

```java
describe('Gene-Up', function() {
  beforeAll(function (done) {		
    browser
		.url('/login.html')
		.call(done);
  });
  afterAll(function (done) {
    browser.end(done);
  });
  describe('when a user log in', function () {
    it('should see main page', function (done) {
				
		browser
			.setValue('#username', 'manager')
			.pause(1000)
			.setValue('#password', 'manager')
			.pause(1000)
			.click('#signin')
			.waitForExist('#headerTitle h1')
			.getTitle()
			.then(function(title){
				expect(title).toBe('FR_Home');
			})
			.pause(3000)
			.call(done);
    });
  });
});
```

... et placez le dans le dossier ./test/specs/login.

Remarque : les instructions pause() sont facultatives et servent principalement à debugger le test.

## Lancer les tests 

> selenium-standalone start

> wdio wdio.conf.js


## Ajouter la prise automatique de screenshot en cas d'échec

Complétez la fonction expectationResultHandler de la manière suivante dans le fichier wdio.config.js :

```java
jasmineNodeOpts: {
    defaultTimeoutInterval: 10000,
    expectationResultHandler: function(passed, assertion) {
 
        /**
         * only take screenshot if assertion failed
         */
        if(passed) {
            return;
        }
 
        var title = assertion.message.replace(/\s/g, '-');
        browser.saveScreenshot(('assertionError_' + title + '.png'));
 
    }
},
```

## Modifier le timeout de Jasmine 

Il arrive que le test réussisse mais que le message d'erreur suivant apparaisse :
Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL

Augmentez la valeur de la propriété defaultTimeoutInterval dans le fichier wdio.config.js :

```java
jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    expectationResultHandler: ...
},
```

# Mettre en place CodeceptJS 

Attention, certaines fonctions de cette librairie nécessitent ES6 !

## Installer CodeceptJS 

> npm install -g codeceptjs

## Configurer le projet 

> codeceptjs init

Choisissez les options que vous préférez.

## Créer un test 

> codeceptjs gt

Editez le test généré avec le code suivant :

```java
Feature('Login');

Scenario('When a user log in, he should see main page', (I) => {
	I.amOnPage('/login.html');
	I.fillField('FR_User Name', 'manager');
	I.fillField('FR_Password', 'manager');
	I.click('FR_Login');
	
	I.waitForElement('#headerTitle h1', 10);
	
	I.seeInTitle('FR_Home');	
});
```


## Lancer les tests 

> selenium-standalone start

> codeceptjs run --steps

## Ajouter l'export xUnit 

> npm install -g xunit-file

> codeceptjs run --steps --reporter xunit-file

## Utiliser Chai pour les assertions 

> npm install --save-dev chai

Ajouter ensuite dans le code :

```java
let expect = require('chai');
expect(true).to.equal(true);
```

## Non testé 

Fonction de récupération de valeurs (grabTitle() par exemple) qui utilisent le mot clé yield.
