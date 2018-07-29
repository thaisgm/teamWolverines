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

module.exports = mongoose.model('School', schoolSchema);
