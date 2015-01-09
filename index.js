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
  })

  return pairs
}

function getPairs (calls) {
  var pairs = []
  calls.forEach(function(callLower, i) {
    var callHigher = calls[i+1]
    if (callHigher) pairs.push({low: callLower, high: callHigher})
  })
  return pairs
}
