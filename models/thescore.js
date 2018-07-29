var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scoreSchema = new Schema({
  "school": {
    type: mongoose.Schema.ObjectId,
    ref: 'School'
  },
  "dist": Number, //string?
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

var score = mongoose.model('Score', scoreSchema);

module.exports = score;
