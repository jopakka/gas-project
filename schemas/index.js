'use strict';
import {gql} from 'apollo-server-express';
import stations from './stations';

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
];
