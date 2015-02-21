var q = require('bluebird');

module.exports = {

  submit: function(req, res) {
    var gender = req.param('gender');
    var industry = req.param('industry');
    var name = req.param('name');
    var province = req.param('province') == 'Other' ? 'Canada' : req.param('province');

    var GradSurvey = OntarioGradSurvey.find().where({ programArea: industry});
    var UnemploymentSC = UnemploymentRatesStatsCan.find().where({ year: 2012, province: province });
 
    q.all([GradSurvey, UnemploymentSC]).then(function(results) {
      console.log(results);
      return res.send(200);
    }).catch(function(error) {
      console.log(error);
      return res.send(200);
    });
  }

};
