var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
   "name": String,
   "level": String,
   "langProg": Array,
   "start": String,
   "end": String,
   "afterSchoolProg": Array,
   "demo": Array,
   "size": Number,
   "test": Array,
   "address": String,
   "neighbor": String,
   "Link": Array,
   "imageUrl": String,
})

var school = mongoose.model('School', schoolSchema);

//new points schema for each school

var pointsSchema = new Schema({
 "scores": [

 {"school": {
   type: mongoose.Schema.ObjectId,
   ref: 'school'
 }},
 {"dist": Number},
 {"commute": {
   "car": Number,
   "bus": Number,
   "walk": Number
 }},
 {"scores": Number},
 {"afterschool": Number},
 {"language": Number},
 {"totalPoints": Number}
 ]
})

var Points = mongoose.model('Points', pointsSchema);

module.exports =  {'School': school, 'Points': Points}
