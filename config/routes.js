module.exports.routes = {

  'POST /api/submit': {
    controller: 'SubmissionController',
    action: 'submit'
  },

  'GET /api/getIndustryList': {
    controller: 'SubmissionController',
    action: 'getIndustryList'
  }

};