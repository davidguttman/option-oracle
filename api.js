var LRU = require('lru-cache')
var yOptions = require('y-options')
var sendJson = require('send-data/json')

var calculateSpreads = require('./spread-score')

var cache = LRU({maxAge: 6 * 3600 * 1000})

module.exports =
  { getQuotes: function (req, res, opts) {
      yOptionsCache(opts.params, function(err, quotes) {
        sendJson(req, res, quotes)
      })
    }

  , getSpreads: function (req, res, opts) {
      yOptionsCache(opts.params, function(err, quotes) {
        sendJson(req, res, calculateSpreads(quotes))
      })
    }
  }

function yOptionsCache (opts, cb) {
  var key = JSON.stringify(opts)
  var cached = cache.get(key)

  if (cached) return setImmediate(cb, null, cached)

  yOptions(opts, function(err, quotes) {
    cache.set(key, quotes)
    cb(err, quotes)
  })
}
