'use strict';
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index';
import resolvers from './resolvers/index';
import express from 'express';
import db from './utils/db';
import helmet from 'helmet';

const httpPort = process.env.HTTP_PORT || 3000;

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
    });

    const app = express();
    if(process.env.NODE_ENV === 'production') {
      app.use(helmet());
    }

    await server.start();

    server.applyMiddleware({app});

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
