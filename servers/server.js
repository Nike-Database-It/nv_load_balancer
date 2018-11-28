require('newrelic');
const express = require('express');

const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

let server = 1;

let secReq = 1;

app.get('/:productSku/colors', (req, res) => {
  if (server === 1) {
    axios.get(`http://ec2-52-91-19-251.compute-1.amazonaws.com:3006/${req.params.productSku }/colors`)
    .then((resp) => {
      res.status(200).send(resp.data);
      server = 2;
    })
    .catch(err => res.status(500).end(err.message))
  }

  if (server === 2) {
    axios.get(`http://ec2-18-208-180-115.compute-1.amazonaws.com:3006/${req.params.productSku}/colors`)
      .then((resp) => {
        res.status(200).send(resp.data);
        server = 1;
      })
      .catch(err => res.status(500).end(err.message))
  }
})

app.get('/:productSku/colors/:style', (req, res) => {
  if (secReq === 1) {
    axios.get(`http://ec2-52-91-19-251.compute-1.amazonaws.com:3006/${req.params.productSku}/colors/${req.params.style}`)
      .then((resp) => {
        res.status(200).send(resp.data);
        secReq = 1;
      })
      .catch(err => res.status(500).end(err.message))
  }

  if (secReq === 2) {
    axios.get(`http://ec2-18-208-180-115.compute-1.amazonaws.com:3006/${req.params.productSku}/colors/${req.params.style}`)
      .then((resp) => {
        res.status(200).send(resp.data);
        secReq = 1;
      })
      .catch(err => res.status(500).end(err.message))
  }
})

app.listen(3000, () => {
  console.log('>>>>>>>>> listening on port 3000');
});