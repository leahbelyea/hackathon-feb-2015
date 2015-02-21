/**
* StudentLoanBalance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    year: {
      type: 'integer',
    },
    doctorate: {
      type: 'integer',
    },
    master: {
      type: 'integer',
    },
    undergraduate: {
      type: 'integer',
    },
    nonDegree: {
      type: 'integer',
    },
    average: {
      type: 'integer',
    },
  }
};

