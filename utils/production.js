'use strict';

import http from 'http';
import {initIO} from './socket';

export default (app, httpPort) => {
  console.log('Starting production');
  app.enable('trust proxy');
  app.use((req, res, next) => {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  const httpServer = http.createServer(app);
  initIO(httpServer, httpPort);

  // app.listen(httpPort,
  //     () => console.log(`Production app listening port ${httpPort}`));
}
