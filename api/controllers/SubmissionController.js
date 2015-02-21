var q = require('bluebird');

module.exports = {

  submit: function(req, res) {
    var gender = req.param('gender');
    var industry = req.param('industry');
    var name = req.param('name');
    var province = req.param('province') == 'Other' ? 'Canada' : req.param('province');

    var GradSurvey = OntarioGradSurvey.find().where({ programArea: industry});
    var UnemploymentOntario = UnemploymentRatesStatsCan.find().where({ year: 2012, province: 'Ontario' });
    var UnemploymentProvince = UnemploymentRatesStatsCan.find().where({ year: 2012, province: province });
 
    q.props({GradSurvey: GradSurvey, UnemploymentOntario: UnemploymentOntario, UnemploymentProvince: UnemploymentProvince}).then(function(results) {
      var gradRateUnadjusted = results.GradSurvey[0]['employment6mo'];
      var ontarioGradRate = 100 - results.UnemploymentOntario[0]['university'] == null ? null : 100 - results.UnemploymentOntario[0]['university'];
      var provinceGradRate = results.UnemploymentProvince[0]['university'] == null ? null : 100 - results.UnemploymentProvince[0]['university'];
      var gradRateAdjusted = getAdjustedRate(gradRateUnadjusted, ontarioGradRate, provinceGradRate);
      var nonGradRate = 100 - results.UnemploymentProvince[0]['highSchool'] == null ? null : 100 - results.UnemploymentProvince[0]['highSchool'];

      results = {
        'selectedGrad': {
          'employmentRate': gradRateAdjusted,
          'breakEven': 5.2,
          'salary': 48000,
        },
        'noGrad': {
          'employmentRate': nonGradRate,
          'salary': 25000,
        },
        'alternativeGrad': [
          {
          'employmentRate': 97.2,
          'breakEven': 3,
          'salary': 62000,
          },
          {
          'employmentRate': 96.7,
          'breakEven': 4.6,
          'salary': 59000,
          },
        ],
      };

      return res.send(results);
    }).catch(function(error) {
      console.log(error);
      return res.send(200);
    });
  }

};

// Adjust Ontario industry employment rate based on user's province
function getAdjustedRate(unadjustedRate, ontarioRate, provinceRate) {
  if (provinceRate == null || ontarioRate == null) {
    return unadjustedRate;
  }
  return unadjustedRate * provinceRate / ontarioRate;
}
