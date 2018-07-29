var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
   "name": String,
   "level": String,
   "langProg": Array,
   "start": String,
   "end": String,
   "afterSchoolProg": Array,
   "demo": Object,
   "size": Number,
   "test": Array,
   "address": String,
   "neighbor": String,
   "Link": Array,
   "imageUrl": String,
   "dist": Number,
   "commute": Object
});

module.exports = mongoose.model('School', schoolSchema);
