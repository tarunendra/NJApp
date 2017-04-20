var express = require('express');
var router = express.Router();

var fs = require('fs');
var csv = require('fast-csv');


/* GET users listing. */
router.get('/', function(req, res, next) {

  var queryParam1 = req.query.technology;
 
  var skillDataArr = new Array();
 // var stream = fs.createReadStream("Skills_Tarun.csv");
 var stream = fs.createReadStream('PeopleSkills.csv');
csv
  .fromStream(stream, {headers : true})
  .on("data", function(data){
      skillDataArr.push(data);
  })
  .on("end", function() {
      //console.log(skillDataArr.length);
      module.exports.saveData(skillDataArr);
      //console.log("done");
  });

  console.log('Before send..');

  module.exports.saveData = function(data, callback) {
   // console.log(data)
    console.log('inside callback function');
    
    var items = skillDataArr.filter(function(item){
     // console.log('Printing items skills data --->'+item.Skill)
      var flag = item.Skill.includes(queryParam1);
     // console.log('Match status --->'+flag)
      return flag;
    });

    res.send(items);
}

console.log('AT THE END---'+skillDataArr.length);

});

module.exports = router;
