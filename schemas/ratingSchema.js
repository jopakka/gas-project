'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    rating(historyID: ID): Int
  }
  
  extend type Mutation {
    addRating(historyID: ID!, rating: Int!): Rating
  }
  
  type Rating {
    userID: ID
    historyID: ID
    rating: Int
  }
`;