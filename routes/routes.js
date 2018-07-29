var express = require('express');
var router = express.Router();
var School = require('../models/school.js')


router.get('/quiz', function(req, res){
  res.render('form');
})
// router.post('/quiz', function(req, res){
//   res.redirect('/map');
// })

router.get('/map',function(req,res){
 var school1 = new School({
   "name": "St. Louise",
   "level": "Elementary",
   "langProg": ['Spanish', 'French'],
   "start": "8 a.m.",
   "end": "3 p.m.",
   "afterSchoolProg": ['Basketball', 'Soccer'],
   "demo": ['Black', '10%'],
   "size": 400,
   "test": [{Math:40, English:40}],
   "address": "133 156th Ave SE, Bellevue, WA 98007",
   "neighbor": "South Side",
   "Link": ["https://www.stlouiseschool.org/"],
   "imageUrl": "https://images1.privateschoolreview.com/photo/780x600/36000/36139/St-Louise-Parish-School-rMozwk.jpg",
 })

 var school2 = new School({
   "name": "St. Francis High School",
   "level": "High School",
   "langProg": ['Spanish', 'French', 'Mandarin'],
   "start": "7:45 a.m.",
   "end": "2:40 p.m.",
   "afterSchoolProg": ['Basketball', 'Soccer'],
   "demo": ['Black', '10%'],
   "size": 400,
   "test": [{Math:40, English:40}],
   "address": "530 Shelby Lane",
   "neighbor": "South Side",
   "Link": ["https://www.sfhs.com/"],
   "imageUrl": "http://1.bp.blogspot.com/-gQbuw9F5yS0/VTV1Lb6iMCI/AAAAAAAAAfo/pEVp6vWGpvc/s1600/st-francis-athletics-still-light-studios-2.jpg",
 })

 var school3 = new School({
   "name": "University of Chicago",
   "level": "University",
   "langProg": ['Spanish', 'French', 'Mandarin, Portuguese'],
   "start": "7:45 a.m.",
   "end": "2:40 p.m.",
   "afterSchoolProg": ['Basketball', 'Soccer'],
   "demo": ['Black', '10%'],
   "size": 400,
   "test": [{Math:40, English:40}],
   "address": "5801 S Ellis Ave, Chicago, IL 60637",
   "neighbor": "South Side",
   "Link": ["https://www.uchicago.edu/"],
   "imageUrl": "https://timedotcom.files.wordpress.com/2016/08/university-chicago-uchicago-trigger-warnings-safe-spaces-college-campus.jpg",
 })
  res.render('top3list.hbs', {schools: [school1, school3]
  });
})


module.exports = router;
