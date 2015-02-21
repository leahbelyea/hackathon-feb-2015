module.exports.routes = {

  'POST /api/submit': {
    controller: 'SubmissionController',
    action: 'submit'
  },

  'GET /api/provinceList': {
    controller: 'SubmissionController',
    action: 'provinceList'
  }

};