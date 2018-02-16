//server.js
const session = require("express-session")
const bodyParser  = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();
const passport = require('passport')
const mongoose = require('mongoose');

const routes = require('./routes/routes');

// Conexión con la base de datos
mongoose.connect('mongodb://35.229.107.224:80/psychetech',
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con exito a la BD');
});

// Configuración
app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000'));

// Localización de los ficheros estaticos
app.use(express.static(__dirname + '/public'));				
app.use(bodyParser.json());
app.use(session({ secret: "psychetech" }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});

app.use('/', routes);
