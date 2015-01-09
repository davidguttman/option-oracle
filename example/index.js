var tablify = require('tablify').tablify

var oracle = require('../')

var quotes = require('./quotes.json')

var results = oracle(quotes)

results.forEach(function(result) {
  result.buy = result.low.strike
  result.sell = result.high.strike
})

var opts = { keys:['buy', 'sell', 'risk', 'cost', 'maxProfit'], show_index: false}
console.log(tablify(results, opts))
