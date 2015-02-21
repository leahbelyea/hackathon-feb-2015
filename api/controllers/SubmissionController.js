var q = require('bluebird');

module.exports = {

  submit: function(req, res) {
    var gender = req.param('gender');
    var industry = req.param('industry');
    var name = req.param('name');
    var province = req.param('province') == 'Other' ? 'Canada' : req.param('province');

    console.log(req.params.all());

    var GradSurvey = OntarioGradSurvey.find().where({ programArea: industry});
    var UnemploymentSC = UnemploymentRatesStatsCan.find().where({ year: 2012, province: province });
 
    q.all([GradSurvey, UnemploymentSC]).then(function(results) {
      console.log(results);
      return res.send(200);
    }).catch(function(error) {
      console.log(error);
      return res.send(200);
    });
  },

  getIndustryList: function(req, res) {
    SimilarPrograms.find().exec(function(err, programs) {
      if (err || !programs) return res.send(500, { error: err, programs: programs });

      return res.send(programs);
    });
  }

};
