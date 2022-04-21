'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     fuel98(stationID: String!): Fuel
   }
   
   extend type Mutation {
     update98(stationID: String!, price: String!): Fuel
   }
`;
