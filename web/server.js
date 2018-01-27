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
mongoose.connect('mongodb://104.197.252.243:80/psychetech',
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con exito a la BD');
});

// Configuración

// Localización de los ficheros estaticos
app.use(express.static(__dirname + '/public'));
// Muestra un log de todos los request en la consola		
//app.use(express.logger('dev'));
// Permite cambiar el HTML con el método POST					
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Simula DELETE y PUT						
//app.use(methodOverride());


// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});

/*app.get('*', function(req, res) {						
	res.sendfile('../public/index.html');				
});
*/
app.use('/', routes);
