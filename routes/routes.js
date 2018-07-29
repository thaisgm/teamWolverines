var express = require('express');
var router = express.Router();


router.get('/quiz', function(req, res){
  res.render('form');
})

router.post('/quiz', function(req, res){
  res.redirect('/map');
})

router.get('/map', function(req, res){
  res.render('map');
})


module.exports = router;
