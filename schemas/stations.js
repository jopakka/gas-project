'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     stations(bounds: Bounds): [Station]
   }
   
   type Station {
      id: String
      properties: Properties
   }
   
   type Properties {
      address: Address
      amenity: String
      brand: String
      name: String
      operator: String
      shop: String
      source: String
      website: String
      wheelchair: String
   }
   
   type Address {
      city: String
   }
   
   input Bounds {
      s: Float!
      w: Float!
      n: Float!
      e: Float!
   }
`;
