//server.js
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

require('./models/users');
require('./models/pages');
var routes = require('./routes/routes');

// Conexión con la base de datos
mongoose.connect('mongodb:///psychetech',
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con exito a la BD');
});

// Configuración

// Localización de los ficheros estaticos
app.use(express.static(__dirname + '/public'));				
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});

app.use('/', routes);
