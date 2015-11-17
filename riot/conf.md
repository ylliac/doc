
**TODO** Sur cet example, la liste des todos n'affiche pas les éléments même si le compteur est bien mis à jour... doit y avoir un probleme quelque part

# RiotJS - Mise en place

## Dépendances

Ajoutez les dépendances suivantes dans le fichier de config RequireJS.

- RequireJS Text plugin : `text : 'lib/text'`
- RiotJS : `riot : 'lib/riot_compiler'`

Ajoutez également l'emplacement des tags que vous allez créer : `tags : 'tags'`.

## Créer un tag

Créez un fichier `todo.html` dans le répertoire `tags` :

```html
<!-- layout -->
<h3>{opts.title}</h3>

<ul>
	<li each={ item, i in items }>{item}</li>
</ul>

<form onsubmit={add}>
	<input />
	<button>Add #{items.length+1}</button>
</form>

<!-- style -->
<style scoped>
h3 {
	font-size: 40px;
}
</style>
```

Créez un fichier `todo.js` dans le répertoire `tags` :

```js
define(function(require) {

	var riot = require("riot");
	var template = require("text!tags/todo.html");

	riot.tag("todo", template, function(opts) {
		
		var that = this;
		
		that.items = [];

		that.add = function(e) {
			var input = e.target[0];
			that.items.push(input.value);
			input.value = '';
		};
	});
});
```

## Insérer un tag dans une page

Ajoutez le code HTML suivant :

```html
<todo title="Todo List"></todo>

<script type="text/javascript">
	require([ 'config' ], function() {
		require([ 'riot', 'tags/todo'], function(riot) {
			riot.mount('*');
		});
	});
</script>
```
