'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   type Fuel {
      historyID: ID
      rating: Int
      stationID: String
      price: String
      updatedAt: String
   }
`;
