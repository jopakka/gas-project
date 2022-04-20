'use strict';
import {gql} from 'apollo-server-express';
import stations from './stations';
import fuel95 from './fuel95';
import fuel98 from './fuel98';
import fuelDiesel from './fuelDiesel';
import fuel from './fuel';
import user from './user';
import favorites from './favorites';

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
];
