var express = require('express');
var router = express.Router();

router.get('/list',function(req,res){
  SCHEMA_NAME.find().populate(NAME_OF_OBJECTID).exec(function(error,data){
    var newData=data.sort((a,b)=> (a.points+b.points));
    newData.map((data)=>(data.NAME_OF_OBJECTID))
    res.render('top3list', {"schools":newData});
  })

})

module.exports = router;
