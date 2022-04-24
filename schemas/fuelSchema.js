'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   type Fuel {
      stationID: String
      price: String
      updatedAt: String
      userID: ID
   }
`;
