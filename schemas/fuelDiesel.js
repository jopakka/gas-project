'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     fuelDiesel(stationID: String!): Fuel
   }
   
   extend type Mutation {
     updateDiesel(stationID: String!, price: Float!): Fuel
   }
`;
