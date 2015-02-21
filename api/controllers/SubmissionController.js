module.exports = {

  submit: function(req, res) {
    var params = req.params.all();

  },

  provinceList: function(req, res) {
    return res.send({
      'Alberta': 'AB',
      'British Columbia': 'BC',
      'Manitoba': 'MB',
      'New Brunswick': 'NB',
      'Newfoundland and Labrador': 'NL',
      'Nova Scotia': 'NS',
      'Ontario': 'ON',
      'Prince Edward Island': 'PE',
      'Quebec': 'PQ',
      'Saskatchewan': 'SK'
    });
  }

};