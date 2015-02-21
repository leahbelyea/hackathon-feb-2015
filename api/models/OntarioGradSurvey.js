/**
* OntarioGradSurvey.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    'programArea': {
      type: 'string'
    },

    'salary6mo': {
      type: 'integer'
    },

    'salary2yr': {
      type: 'integer'
    },

    'employment6mo': {
      type: 'float'
    },

    'employment2yr': {
      type: 'float'
    }

  }

};

