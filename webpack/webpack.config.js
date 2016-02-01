var webpack = require('webpack');

module.exports = {
  context: __dirname,

	entry: {
      module1: "./src/module1.js",
      module2: "./src/module2.js"
  },
  output: {
  	path: __dirname + "/dist",
      filename: "[name].bundle.js"
  },
	resolve: {
		modulesDirectories: ['node_modules', 'src', ],
		alias: 
		{
			jquery: 'libs/jquery-1.9.0/jquery' //Ne devrait pas être nécessaire, utile quand on veut passer progressivement de requirejs à webpack
		}	  
  },    
  amd: { jQuery: true}, // Pour les anciennes versions de jQuery
  plugins: [
  	new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {
      	warnings: false
  	}}),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "underscore"
	  })
  ],
  devServer: {
  	contentBase: "./dist"
  },
  module: {
    loaders: [
      //JavaScript ES6
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      //HTML
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      //CSS
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      //Images
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000' 
      },
      // LESS
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ],
    preLoaders: [
      //JS Hint
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ]
  }
};
