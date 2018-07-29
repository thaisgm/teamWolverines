var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var initialPointsSchema = new Schema({
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
  {"scores" :Number},
  {"afterschool": Number},
  {"language": Number},
  {"total": Number}
  ]
})

module.exports= mongoose.model('InitialPoints', initialPointsSchema)
