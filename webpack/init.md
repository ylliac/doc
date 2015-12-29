# Mise en place

TODO Ajouter un module babel pour de l'ES6  
TODO Ajouter un module TypeScript : http://www.jbrantly.com/typescript-and-webpack/  



## Ajouter Webpack au projet

npm install webpack --save-dev
npm install webpack-dev-server --save-dev

## Ajouter un fichier gulpfile.js

```js
var gulp = require("gulp");
var gutil = require("gulp-util");
var clean = require('gulp-clean');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

// Removes all files from ./dist/
gulp.task("clean", function () {
    return gulp.src('./dist/**/*', {
            read: false
        })
        .pipe(clean());
});

// Build the bundle
gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [].concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// Launch the webpack dev server
gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        contentBase: 'src',
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

// The development server (the recommended option for development)
gulp.task("default", ["clean", "webpack-dev-server"]);

// Production build
gulp.task("build", ["clean", "webpack:build"]);
```

## Ajouter un fichier webpack.config.js

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  entry: './app/startup',
  output: {
      publicPath: 'assets',
      path: __dirname + "/dist/assets",
      filename: 'bundle.js'
  },
  devtool: 'source-map',
  debug: true
};
```

## Recopier les paths depuis le fichier require.js

```js
requirejs.config({
    baseUrl: ".",
    paths: {
        "backbone": "lib/backbone-1.1.0",
        "jquery": "lib/jquery-1.10.2",
        "underscore": "lib/lodash.underscore-2.3.0",
        "jqueryUI": "lib/jquery-ui.min"
    }
});
```

devient

```js
module.exports = {
    resolve: {
      modulesDirectories: ['src', 'node_modules'],
      alias: {
              "backbone": "lib/backbone-1.1.0",
              "jquery": "lib/jquery-1.10.2",
              "underscore": "lib/lodash.underscore-2.3.0",
              "jqueryUI": "lib/jquery-ui.min"
      }           
    }
}
```

## Remplacer les modules bower par des modules npm

Pour chaque module anciennement référencé de  cette façon dans requirejs :

  "bootstrap": "bower_modules/components-bootstrap/js/bootstrap.min"
  
Supprimer la ligne des alias si ell est présente et installer le package npm correspondant :

  npm install --save bootstrap


## Remplacer l'utilisation de RequireJS Text

Enlevez le prefix 'text!' dans l'instruction require des fichiers HTML :

require("text!./main.html"); ==> require("./main.html");

Ajoutez le loader webpack htmlloader :

npm install html-loader --save-dev

Ajoutez le loader dans le fichier de config webpack :

```js
loaders: [{
  test: /\.html$/,
  loader: "html-loader"
}]
```

## Copier le fichier HTML de l'application

Ajouter la tache Gulp suivante :

```js
// Copies index.html
gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));
});
```

Le fichier index.html doit contenir l'instruction suivante :

<script src="assets/bundle.js"></script>


## Inclure les CSS

Installez le CSS Loader : npm install css-loader --save-dev
Installez le Style Loader : npm install style-loader --save-dev

Puis ajoutez le dans les loaders :

```js
loaders: [{
  test: /\.css$/,
  loader: "style-loader!css-loader"
}]
```

Installez l'URL loader : npm install url-loader --save-dev

Puis ajoutez le dans les loaders :

```js
loaders: [{
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  loader: 'url-loader?limit=100000' 
}]
```

Installez le file loader : npm install file-loader --save-dev    
(pas besoin de l'ajouter dans les loaders)

Enfin, ajoutez dans startup.js les lignes suivantes :

```js
//CSS
require("bootstrap/dist/css/bootstrap.min.css");
require("datatables.net-bs/css/dataTables.bootstrap.css");
require("css/styles.css");
```

## Problème : Bootstrap nécessite la dépendance jquery
http://stackoverflow.com/questions/26749045/webpack-expressing-module-dependency

Solution 1  : 
Install expose-loader : npm install expose-loader --save-dev    

Ajouter require('expose?$!expose?jQuery!jquery'); dans startup.js avant de faire un require sur bootstrap.

Solution 2 (non testée mais plus propre) :

Ajoutez le code suivant au fichier de configuration :

```js
plugins: [
  new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery"
 })
]
```

## Lancer le serveur

Lancez la commande 'gulp' pour lancer le webpack web server.

Allez ensuite sur l'URL suivante : http://localhost:8080/index.html.  
Pour activer le refresh automatique, allez sur l'URL suivante : http://localhost:8080/webpack-dev-server/index.html.


## Liens Utiles

http://webpack.github.io/docs/configuration.html
https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
http://julienrenaux.fr/2015/03/30/introduction-to-webpack-with-practical-examples/
https://webpack.github.io/docs/list-of-plugins.html





