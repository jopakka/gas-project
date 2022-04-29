'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    userHistory(userID: ID): [History]
    stationHistory(stationID: String!, type: String): [History]
  }
  
  type History {
    userID: ID
    stationID: String
    price: String
    type: String
    updatedAt: String
  }
`;