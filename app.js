const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const identifier =  process.env.IDENTIFIER;
const user = process.env.USER;
const pass = process.env.PASS

const fs = require('fs');
const request = require('request');
const tunnel = require('tunnel');

app.use(bodyParser.json());


app.use(cors({
  credentials: true,
  origin: ['https://daph3105.github.io/']
}));



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const tunnelingAgent = tunnel.httpsOverHttp({
    ca: [ fs.readFileSync('path/to/cert.pem')],
    proxy: {
        host: identifier+'.sandbox.verygoodproxy.com',
        port: 8080,
        proxyAuth: user+':'+pass
    }
});



app.get('/', (req, res) => res.send('Outbound server'))



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
      console.log('Status:', response.statusCode);
      res.json(JSON.parse(body).json);
    }
});
})




app.listen(port, () => console.log(`VGS app listening at http://localhost:${port}`))