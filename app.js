const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

//Dotenv middle-ware to load variables from .env file.
require('dotenv').config();
const port = process.env.PORT || 5000;

//VGS credentials from .env file
const identifier =  process.env.IDENTIFIER;
const user = process.env.USER;
const pass = process.env.PASS

//file system module to read certificate under path/to/cert.pem
const fs = require('fs');
const request = require('request');
const tunnel = require('tunnel');

//body-parser middleware to extract form input and expose it on req.body
app.use(bodyParser.json());

// to handle CORS policy
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
});
//---------------------



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//outbound/forward proxy assigned to tunnelingAgent
const tunnelingAgent = tunnel.httpsOverHttp({
    ca: [ fs.readFileSync('path/to/cert.pem')],
    proxy: {
        host: identifier+'.sandbox.verygoodproxy.com',
        port: 8080,
        proxyAuth: user+':'+pass
    }
});



app.get('/', (req, res) => res.send('Outbound server'))


//Sending outbound request to vgs echo server
app.post('/post', function (req, res) {
request({
    url: 'https://echo.apps.verygood.systems/post',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    agent: tunnelingAgent,
    body: JSON.stringify(req.body)
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
// if successfull, revealed data is returned
      console.log('Status:', response.statusCode);
      res.json(JSON.parse(body).json);
    }
});
})




app.listen(port, () => console.log(`VGS app listening at http://localhost:${port}`))