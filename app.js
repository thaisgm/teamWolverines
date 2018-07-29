"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var School = require('./models/school.js');
var InitialPoints = require('./models/initialPoints.js');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var router = require('./routes/routes.js');
var thais = require('./routes/thais.js');
const translate = require('google-translate-api');

mongoose.connection.on('connected', function(){
  console.log('Connected to MongoDb');
});
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static('public'))

app.use('/', router);
app.use('/', thais);

translate('Ik spreek Engels', {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('listening on port ' + port);
});
