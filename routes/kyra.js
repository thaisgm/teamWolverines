var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var School = require('../models/school');
var InitialPoints = require('../models/initialPoints');
var TheScore = require('../models/thescore')

router.get('/blah', function(req, res) {

  School.find({}, function(error, result){
    if (error){
      console.log(error);
    }else {
      console.log(result);
      res.json(result)

    }
  })

})

router.post('/quiz', function(req, res){
  var distImportance = req.body.distancePreference;
  var academicImportance = req.body.academicPreference;
  var programImportance = req.body.programPreference;
  var languageImportance = req.body.languagePreference;

  var languageArr = [];
  if(req.body.languages.indexOf('Spanish') > -1){
    var index = req.body.languages.indexOf('Spanish');
    languageArr.push(req.body.languages[index]);
  } if(req.body.languages.indexOf('French') > -1){
    var index = req.body.languages.indexOf('French');
    languageArr.push(req.body.languages[index]);
  } if(req.body.languages.indexOf('Cantonese') > -1){
    var index = req.body.languages.indexOf('Cantonese');
    languageArr.push(req.body.languages[index]);
  } if(req.body.languages.indexOf('Mandarin') > -1){
    var index = req.body.languages.indexOf('Mandarin');
    languageArr.push(req.body.languages[index]);
  } if(req.body.languages.indexOf('Japanese') > -1){
    var index = req.body.languages.indexOf('Japanese');
    languageArr.push(req.body.languages[index]);
  } if(req.body.languages.indexOf('Russian') > -1){
    var index = req.body.languages.indexOf('Russian');
    languageArr.push(req.body.languages[index]);
  }

  School.find({level: req.body.schoolLevel}, function(error, result){
    console.log(result);

    for(var i = 0; i < result.length; i ++){

      var langOffered = result[i].langProg;
      var langMatches = 0;
      for(var a = 0; a < langOffered.length; a ++) {
        for(var b = 0; b < languageArr.length; b ++) {
          if(langOffered[a] === languageArr[b]){
            langMatches ++;
          }
        }
      }
      var langRatio = Math.floor(langMatches/languageArr);
      var langPercentage = langRatio * 100;

      var afterSchoolProgScore = 0;
      if(result[i].afterSchoolProg !== 'Not available') {
        afterSchoolProgScore = 100;
      }

      var theScore;

      InitialPoints.findById(result[i]._id, function(err, res){

        var distScore = Math.floor(res.dist*distImportance);
        var scoresScore = Math.floor(res.score*academicImportance);


        var total = distScore + scoresScore + afterSchoolProgScore + langPercentage;

        theScore = new TheScore({
          "school": {
            type: result[i]._id + '2',
            ref: 'School'
          },
          "dist": distScore,
          "commute": {
            "car": res.commute.car,
            "bus": res.commute.bus,
            "walk": res.commute.walk
          },
          "scores": scoresScore,
          "afterschool": afterSchoolProgScore,
          "language": langPercentage,
          "total": total
        })

      })

      theScore.save(function(err){
        if(err){
          res.send(err);
        } else {
          console.log('saved!')
        }
      })

      

    }

  })



})

module.exports = router;
