var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var School = require('../models/school');
var TheScore = require('../models/thescore')


router.post('/quiz', function(req, res){

  //var theScoreArr = [];

  var totalPointsGiven = Number(req.body.distancePreference) + Number(req.body.academicPreference)
   + Number(req.body.programPreference) + Number(req.body.languagePreference) - 4;

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



  } else if (typeof(req.body.languages) === 'object'){
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
} else {
  languageArr.push('Not available')
}

  var grade = req.body.schoolLevel;
  // var gradeFirstLetter = grade.substring(0, 1);
  // var capital = gradeFirstLetter.toUpperCase();
  // var restOfWord = grade.substring(1, grade.length);
  // var finalGrade = capital + restOfWord;
  // console.log("GRADE", finalGrade)
  // console.log(typeof(finalGrade));

  if(grade === 'elementary') {
    grade = 'Elementary'
  } else if (grade === 'middleSchool'){
    grade = 'Middle'
  } else {
    grade = 'High'
  }



   School.find({'level': grade}, function(error, result){ //****
     console.log('\n')
     for (var i = 0; i < result.length; i++){
       console.log("hihi", result[i].level)
     }
     console.log('\n')
    if(error) {
      console.log("error", error)
    } else {
    // console.log("GRADEEEEEEEE", req.body.schoolLevel)

    //console.log(result);

    for(var i = 0; i < result.length; i ++){
      // console.log("HELLOOOOO", result[i])
      // console.log(result[i]._id)
      // console.log(typeof result[i]._id)

      var langOffered = result[i].langProg;
      var langMatches = 0;
      for(var a = 0; a < langOffered.length; a ++) {
        for(var b = 0; b < languageArr.length; b ++) {
          if(langOffered[a] === languageArr[b]){
            langMatches ++;
          }
        }
      }

      var langRatio = langMatches/languageArr.length;
      var langPercentage = Math.floor(langRatio * 100);

      var afterSchoolProgScore = 0;
      if(result[i].afterSchoolProg !== 'Not available') {
        afterSchoolProgScore = 100;
      }

        // var dist = result[i].dist;
        // var initDistScore = 100 - (dist*8.93);
        // console.log("**************", distScore)
        // var distScore = Math.floor(initDistScore*distImportance);
        //console.log("DISTSCORE", distScore);
        var distScore = result[i].dist;

        var totalTests = Number(result[i].test[0].English) + Number(result[i].test[0]['Math'])
        var ogScore = (totalTests)/2;
        var scoresScore = Math.floor(ogScore*academicImportance);
        //console.log("ScSc", scoresScore);

        var total = Math.floor(distScore + scoresScore + afterSchoolProgScore + langPercentage);

        distScore = Math.floor(((-distScore + 100)*11.2)/100)
        console.log('DISTSCOREEEEE', distScore)

        var theScore = new TheScore({
          "school": result[i]._id,
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

        //console.log(theScore)

      theScore.save(function(err){
        if(err){
          console.log(err)
        } else {
          console.log('saved!')
        }
      })

    //theScoreArr.push(theScore);


     } //end of schools iteration

//console.log(theScoreArr)
//res.redirect('/');
    //
    // theScoreArr.sort((a, b) => (a.total + b.total));
    //
    TheScore.find().populate("school").exec(function(err, yay){
      var filtered = yay.filter(function(scoreObj) { return (scoreObj.school.level === grade)})
      console.log(filtered)

      if(err){
        res.send(err)
      } else{

        function compare(a,b){
          let comparison=0;
          if(a.total>b.total){
            comparison=-1
          }
          else{
            comparison =1
          }
          return comparison
        }
        filtered.sort(compare)
        //console.log(result)
        //console.log(filtered)

        // var finalArr = filtered.sort(function(a, b) {return a.total + b.total})
        // for(var i = 0; i < filtered.length; i ++) {
        //
        //   console.log('arrayyyyyy', filtered[i].total)
        //   console.log(typeof(filtered[i].total))
        // }

        //console.log("RES2", result)
        res.render('top3list', {schools: filtered})
      }
    });
    //console.log(theScoreArr);


    //res.redirect('/list')


  }
})





})

module.exports = router;
