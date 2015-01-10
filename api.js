var yOptions = require('y-options')
var sendJson = require('send-data/json')

var calculateSpreads = require('./spread-score')

module.exports =
  { getQuotes: function (req, res, opts) {
      yOptions(opts.params, function(err, quotes) {
        sendJson(req, res, quotes)
      })
    }

  , getSpreads: function (req, res, opts) {
      yOptions(opts.params, function(err, quotes) {
        sendJson(req, res, calculateSpreads(quotes))
      })
    }
  }
