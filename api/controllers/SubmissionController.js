var q = require('bluebird');

module.exports = {

  submit: function(req, res) {
    var gender = req.param('gender');
    var industry = req.param('industry');
    var name = req.param('name');
    var province = req.param('province') == 'Other' ? 'Canada' : req.param('province');

    SimilarPrograms.findOne().where({name: industry}).exec(function(error, careers) {
      if (error) {
        console.log(error);
      }

      var alternativeCareers = careers.alternatives;

      var gradSurvey = OntarioGradSurvey.find().where({ programArea: industry });
      var gradSurveyAlt1 = OntarioGradSurvey.find().where({ programArea: alternativeCareers[0] });
      var gradSurveyAlt2 = OntarioGradSurvey.find().where({ programArea: alternativeCareers[1] });
      var unemploymentOntario = UnemploymentRatesStatsCan.find().where({ year: 2012, province: 'Ontario' });
      var unemploymentProvince = UnemploymentRatesStatsCan.find().where({ year: 2012, province: province });
      var incomeProvince = EmploymentIncomeStatsCan.find().where({ educationalAttainment: 'High school diploma or equivalent' });
      var studentLoan = StudentLoanBalance.find().where({ year: 2012 });
   
      q.props({gradSurvey: gradSurvey, gradSurveyAlt1: gradSurveyAlt1, gradSurveyAlt2: gradSurveyAlt2, unemploymentOntario: unemploymentOntario, unemploymentProvince: unemploymentProvince, incomeProvince: incomeProvince, studentLoan: studentLoan }).then(function(results) {

        return res.send ({
          name: name,
          gender: gender,
          chosenIndustry: {
            name: industry,
            salary6mo: getGradIncome(results.gradSurvey),
            debtIncurred: results.studentLoan[0]['undergraduate'],
            employmentRate: getGradEmployment(results.gradSurvey, results.unemploymentOntario, results.unemploymentProvince),
            breakEven: getBreakEven(getGradIncome(results.gradSurvey), getNonGradIncome(gender, results.incomeProvince), results.gradSurvey, results.studentLoan)
          },
          noDegree: {
            salary: getNonGradIncome(gender, results.incomeProvince),
            debtIncurred: 0,
            employmentRate: getNonGradEmployment(results.unemploymentProvince),
          },
          alternateIndustry1: {
            name: careers.alternatives[0],
            salary6mo: getGradIncome(results.gradSurveyAlt1),
            debtIncurred: results.studentLoan[0]['undergraduate'],
            employmentRate: getGradEmployment(results.gradSurveyAlt1, results.unemploymentOntario, results.unemploymentProvince),
            breakEven: getBreakEven(getGradIncome(results.gradSurveyAlt1), getNonGradIncome(gender, results.incomeProvince), results.gradSurveyAlt1, results.studentLoan)
          },
          alternateIndustry2: {
            name: careers.alternatives[1],
            salary6mo: getGradIncome(results.gradSurveyAlt2),
            debtIncurred: results.studentLoan[0]['undergraduate'],
            employmentRate: getGradEmployment(results.gradSurveyAlt2, results.unemploymentOntario, results.unemploymentProvince),
            breakEven: getBreakEven(getGradIncome(results.gradSurveyAlt2), getNonGradIncome(gender, results.incomeProvince), results.gradSurveyAlt2, results.studentLoan)
          }
        });

      }).catch(function(error) {
        console.log(error);
        return res.send(200);
      });
    });
  },

  getIndustryList: function(req, res) {
    SimilarPrograms.find().exec(function(err, programs) {
      if (err || !programs) return res.send(500, { error: err, programs: programs });

      return res.send(programs);
    });
  }
};

function getGradEmployment (gradSurvey, unemploymentOntario, unemploymentProvince) {
  var gradRateUnadjusted = gradSurvey[0]['employment6mo'];
  var ontarioGradRate = 100 - unemploymentOntario[0]['university'] === null ? null : 100 - unemploymentOntario[0]['university'];
  var provinceGradRate = unemploymentProvince[0]['university'] === null ? null : 100 - unemploymentProvince[0]['university'];
  if (provinceGradRate !== null && ontarioGradRate !== null) {
    return gradRateUnadjusted * provinceGradRate / ontarioGradRate;
  }
  return gradRateUnadjusted;
}

function getGradIncome (gradSurvey) {
  return gradSurvey[0]['salary6mo'];
}

function getBreakEven (gradIncome, nonGradIncome, gradSurvey, studentLoan) {
  var year = 0;
  var nonGradWorth = 0;
  var gradWorth = 0;
  var studentLoanBalance = studentLoan[0]['undergraduate'];
  var gradIncome2yr = gradSurvey[0]['salary2yr'];

  while (true) {

    year++;
    nonGradWorth += nonGradIncome;

    if (year == 4) {
      gradWorth -= studentLoanBalance;
    }
    else if (year > 4 && year < 6) {
      gradWorth += gradIncome;
    }
    else if (year >= 6) {
      gradWorth += gradIncome2yr;
    }

    if (gradWorth != 0 && gradWorth >= nonGradWorth) {
      break;
    }
    else if (year > 60) {
      year = null;
      break;
    }
  }

  return year;
}

function getNonGradEmployment(unemploymentProvince) {
  return 100 - unemploymentProvince[0]['highSchool'] === null ? null : 100 - unemploymentProvince[0]['highSchool'];
}

function getNonGradIncome(gender, incomeProvince) {
  var salaryCategory = gender == 'Male' ? '25to29Men' : '25to29Women';
  return incomeProvince[0][salaryCategory];
}
