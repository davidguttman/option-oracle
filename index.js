var http = require('http')
var Router = require('routes-router')
var Corsify = require('corsify')
var sendHtml = require('send-data/html')

var api = require('./api')

var cors = Corsify({'Access-Control-Allow-Methods': 'GET'})

var app = Router()
app.addRoute('/api/quotes/:symbol/:date', cors(api.getQuotes))
app.addRoute('/api/spreads/:symbol/:date', cors(api.getSpreads))

var port = process.env.PORT || 3454
http.createServer(app).listen(port)

console.log('OptionsOracle listening on port', port)
