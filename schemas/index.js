'use strict';
import {gql} from 'apollo-server-express';
import stations from './stationsSchema';
import fuel95 from './fuel95Schema';
import fuel98 from './fuel98Schema';
import fuelDiesel from './fuelDieselSchema';
import fuel from './fuelSchema';
import user from './userSchema';
import favorites from './favoritesSchema';
import history from './historySchema';

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

export default [
  linkSchema,
  stations,
  fuel,
  fuel95,
  fuel98,
  fuelDiesel,
  user,
  favorites,
  history,
];
