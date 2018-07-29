var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var School = require('../models/school');
var TheScore = require('../models/thescore')


router.post('/quiz', function(req, res){
  var totalPointsGiven = req.body.distancePreference + req.body.academicPreference
   + req.body.programPreference + req.body.languagePreference - 4;

  var distImportance = (req.body.distancePreference-1)/totalPointsGiven;
  var academicImportance = (req.body.academicPreference-1)/totalPointsGiven;
  var programImportance = (req.body.programPreference-1)/totalPointsGiven;
  var languageImportance = (req.body.languagePreference-1)/totalPointsGiven;

  var languageArr = [];

  if(typeof(req.body.languages) === 'string'){
    if(req.body.languages === 'Spanish') {
      languageArr.push('Spanish');
    } if (req.body.languages === 'French') {
      languageArr.push('French');
    } if (req.body.languages === 'Cantonese') {
      languageArr.push('Cantonese');
    } if (req.body.languages === 'Mandarin') {
      languageArr.push('Mandarin');
    } if (req.body.languages === 'Japanese') {
      languageArr.push('Japanese');
    } if (req.body.languages === 'Russian') {
      languageArr.push('Russian');
    }



  } else {
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
}

  //var grade = req.body.schoolLevel;
  //upper case  level: req.body.schoolLevel

  School.find(function(error, result){

    if(error) {
      console.log(error)
    } else {
    console.log("GRADEEEEEEEE", req.body.schoolLevel)
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
      var langRatio = Math.floor(langMatches/languageArr.length);
      var langPercentage = langRatio * 100;

      var afterSchoolProgScore = 0;
      if(result[i].afterSchoolProg !== 'Not available') {
        afterSchoolProgScore = 100;
      }


        var distScore = Math.floor(50*distImportance);

        var ogScore = Math.floor((result[i].test.English + result[i].test['Math'])/2);
        var scoresScore = Math.floor(ogMath*academicImportance);


        var total = distScore + scoresScore + afterSchoolProgScore + langPercentage;

        var theScore = new TheScore({
          "school": {
            type: result[i]._id,
            ref: 'School'
          },
          "dist": distScore,
          "commute": {
            "car": 20,
            "bus": 30,
            "walk": 45
          },
          "scores": scoresScore,
          "afterschool": afterSchoolProgScore,
          "language": langPercentage,
          "total": total
        })



      theScore.save(function(err){
        if(err){
          res.send(err);
        } else {
          console.log('saved!')
        }
      })



    } //end of schools iteration

    res.render('top3list', {schools: theScore})

  }})



})

module.exports = router;
