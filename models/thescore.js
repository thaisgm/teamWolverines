var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var theScoreSchema = new Schema({
  "school": {
    type: mongoose.Schema.ObjectId,
    ref: 'School'
  },
  "dist": Number,
  "commute": {
    "car": Number,
    "bus": Number,
    "walk": Number
  },
  "scores": Number,
  "afterschool": Number,
  "language": Number,
  "total": Number
})

var theScore = mongoose.model('TheScore', theScoreSchema);

module.exports =  {TheScore: theScore}
