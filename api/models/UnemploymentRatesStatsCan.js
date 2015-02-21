/**
* UnemploymentRatesStatsCan.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    province: {
      type: 'string',
    },
    year: {
      type: 'integer',
    },
    all: {
      type: 'float',
    },
    ltHighSchool: {
      type: 'float',
    },
    highSchool: {
      type: 'float',
    },
    collegeTrade: {
      type: 'float',
    },
    university: {
      type: 'float',
    },
  }
};

