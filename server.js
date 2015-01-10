var http = require('http')
var Router = require('routes-router')
var Corsify = require('corsify')
var sendJson = require('send-data/json')
var sendHtml = require('send-data/html')
var yOptions = require('y-options')

var cors = Corsify({'Access-Control-Allow-Methods': 'GET'})

var app = Router()
app.addRoute('/api/:symbol/:date', cors(function(req, res, opts) {
  yOptions(opts.params, function(err, quotes) {
    sendJson(req, res, quotes)
  })
}))

var port = process.env.PORT || 3454
http.createServer(app).listen(port)

console.log('OptionsOracle listening on port', port)
