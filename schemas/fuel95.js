'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     fuel95(stationID: String!): Fuel
   }
   
   extend type Mutation {
     update95(stationID: String!, price: Float!): Fuel
   }
`;
