import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import exphbs from "express-handlebars"
var app=express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
