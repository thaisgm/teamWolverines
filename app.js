"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var School = require('./models/school').School;
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

mongoose.connection.on('connected', function(){
  console.log('Connected to MongoDb');
});
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
  res.render('index');
})

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('listening on port ' + port);
});
