'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   type Fuel {
      stationID: String
      price: Float
      updatedAt: String
   }
`;
