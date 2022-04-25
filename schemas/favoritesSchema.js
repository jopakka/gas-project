'use strict';
import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    favorites: [Station]
    favorite(stationID: String): Favorite
  }
  
  extend type Mutation {
    addFavorite(stationID: String!): Favorite
    deleteFavorite(stationID: String!): Boolean
  }
  
  type Favorite {
    userID: ID
    stationID: String
  }
`;