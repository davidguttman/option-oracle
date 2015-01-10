module.exports = function(quotes) {
  var quote = quotes.quote
  var callsAll = quotes.calls

  var calls = callsAll.filter(function(call) {
    if (call.strike <= quote) return false
    return true
  })

  var spreads = getSpreads(calls)
  spreads.forEach(function(spread) {
    spread.risk = (spread.high.strike - quote)/quote
    spread.cost = spread.low.ask - spread.high.bid
    spread.maxProfit = (spread.high.strike - spread.low.strike) - spread.cost
    spread.spread = (spread.maxProfit - spread.cost) / spread.cost
    spread.score = spread.spread/Math.pow(spread.risk, 3)
  })

  return spreads
}

function getSpreads (calls) {
  var spreads = []
  calls.forEach(function(callLower, i) {
    for (var j = i+1; j < calls.length; j++) {
      spreads.push({low: callLower, high: calls[j]})
    }
  })
  return spreads
}
