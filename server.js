'use strict';
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index';
import resolvers from './resolvers/index';
import express from 'express';
import db from './utils/db';
import helmet from 'helmet';

import overpass from 'query-overpass';

const httpPort = process.env.HTTP_PORT || 3000;

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
    });

    const app = express();
    // app.use(helmet());

    await server.start();

    server.applyMiddleware({app});

    app.get('/gas', (req, res) => {
      overpass(
          'node(60.21611486153282,24.691686630249023,60.25310087633947,24.751253128051758)[amenity=fuel];out;',
          (err, data) => {
            data.features.forEach(f => {
              console.log(f['geometry']);
            });
            res.json(data.features);
          }, {flatProperties: true});
    });

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    db.on('connected', () => {
      if (process.env.NODE_ENV === 'production') {
        (async () => (await import('./utils/production')).default(app,
            httpPort))();
      } else {
        (async () => (await import('./utils/localhost')).default(app,
            httpPort))();
      }
    });
  } catch (e) {
    console.error('Server error: ' + e.message);
  }
})();
