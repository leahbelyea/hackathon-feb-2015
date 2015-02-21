module.exports = {

  submit: function(req, res) {
    var params = req.params.all();

  },

  provinceList: function(req, res) {
    return res.send([
      {'name': 'Alberta',                   'abbreviation': 'AB' },
      {'name': 'British Columbia',          'abbreviation': 'BC' },
      {'name': 'Manitoba',                  'abbreviation': 'MB' },
      {'name': 'New Brunswick',             'abbreviation': 'NB' },
      {'name': 'Newfoundland and Labrador', 'abbreviation': 'NL' },
      {'name': 'Nova Scotia',               'abbreviation': 'NS' },
      {'name': 'Ontario',                   'abbreviation': 'ON' },
      {'name': 'Prince Edward Island',      'abbreviation': 'PE' },
      {'name': 'Quebec',                    'abbreviation': 'PQ' },
      {'name': 'Saskatchewan',              'abbreviation': 'SK' }
    ]);
  }

};