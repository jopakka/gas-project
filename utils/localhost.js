'use strict';
import dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import fs from 'fs';

dotenv.config();
const httpsPort = process.env.HTTPS_PORT || 8000;

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert,
};

export default (app, httpPort) => {
  https.createServer(options, app).
      listen(httpsPort, () => console.log(
          `Localhost secure app listening port ${httpsPort}`));
  http.createServer((req, res) => {
    res.writeHead(301,
        {'Location': `https://localhost:${httpsPort}` + req.url});
    res.end();
  }).
      listen(httpPort,
          () => console.log(`Localhost app listening port ${httpPort}`));
}