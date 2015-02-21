/**
* EmploymentIncomeStatsCan.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    'educationalAttainment': {
      type: 'string'
    },

    'total': {
      type: 'integer'
    },

    '25to29Women': {
      type: 'integer'
    },

    '25to29Men': {
      type: 'integer'
    },

    '25to29Ratio': {
      type: 'float'
    },

    '30to34Women': {
      type: 'integer'
    },

    '30to34Men': {
      type: 'integer'
    },

    '30to34Ratio': {
      type: 'float'
    },

    '35to39Women': {
      type: 'integer'
    },

    '35to39Men': {
      type: 'integer'
    },

    '35to39Ratio': {
      type: 'float'
    }

  }

};

