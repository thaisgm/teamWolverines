var express = require('express');
var router = express.Router();
var School = require('../models/school.js')


router.get('/quiz', function(req, res){
  res.render('form');
})

router.post('/quiz', function(req, res){
  res.redirect('/map');
})

router.get('/map',function(req,res){
 var school = new School({
   "name": "St. Louise",
   "level": "Elementary",
   "langProg": ['Spanish', 'French'],
   "start": "8 a.m.",
   "end": "10 a.m.",
   "afterSchoolProg": ['Basketball', 'Soccer'],
   "demo": ['Black', '10%'],
   "size": 400,
   "test": [{Math:40, English:40}],
   "address": "530 Shelby Lane",
   "neighbor": "South Side",
   "Link": ["https://www.stlouiseschool.org/"],
   "imageUrl": "https://3.files.edl.io/2a02/18/07/18/133445-9b659130-6ea5-4e18-bb46-96dba953184d.jpg",
 })
 console.log(school.name)
 console.log(school.level)
 console.log(school.langProg[0])
 console.log(school.start)
 console.log(school.end)
 console.log(school.afterSchoolProg)
 var myScore = school.test[0].Math
 console.log(school.test[0].Math)
  res.render('top3list.hbs', {link: school.Link[0], score: myScore, schools: [school]
  });
})


module.exports = router;
