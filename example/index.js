var _ = require('underscore')
var tablify = require('tablify').tablify

var oracle = require('../')

var quotes = require('./quotes.json')

var results = oracle(quotes)

var sorted = _.sortBy(results, 'score')

var formatted = sorted.map(function(result) {
  var pretty =
    { buy: result.low.strike
    , sell: result.high.strike
    , risk: result.risk.toFixed(2)
    , cost: result.cost.toFixed(2)
    , maxProfit: result.maxProfit.toFixed(2)
    , spread: result.spread.toFixed(2)
    , score: result.score.toFixed(2)
    }
  return pretty
})

var opts = { keys:['buy', 'sell', 'risk', 'cost', 'maxProfit', 'spread', 'score'], show_index: false}
console.log(tablify(formatted, opts))
