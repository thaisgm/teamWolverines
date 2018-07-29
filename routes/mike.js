var express = require('express');
var router = express.Router();

router.get('/list',function(req,res){
  InitialPoints.find().populate('school').exec(function(error,data){
    var newData=data.sort((a,b)=> (a.totalPoints + b.totalPoints));
    var objectOfData=newData.map((data)=>(data.NAME_OF_OBJECTID));
    res.render('top3list', {"schools":ObjectOfData, 'commute':newdata.commute});
  })

})

module.exports = router;
