module.exports = function(quotes) {
  var quote = quotes.quote
  var callsAll = quotes.calls

  var calls = callsAll.filter(function(call) {
    if (call.strike <= quote) return false
    return true
  })

  var pairs = getPairs(calls)
  pairs.forEach(function(pair) {
    pair.risk = (pair.high.strike - quote)/quote
    pair.cost = pair.low.ask - pair.high.bid
    pair.maxProfit = (pair.high.strike - pair.low.strike) - pair.cost
    pair.spread = (pair.maxProfit - pair.cost) / pair.cost
    pair.score = pair.spread/Math.pow(pair.risk, 3)
  })

  return pairs
}

function getPairs (calls) {
  var pairs = []
  calls.forEach(function(callLower, i) {
    for (var j = i+1; j < calls.length; j++) {
      pairs.push({low: callLower, high: calls[j]})
    }
  })
  return pairs
}
