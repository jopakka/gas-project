'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     station(id: String!): Station
     stationsByBounds(bounds: Bounds!): [Station]
     stationsAround(location: Location!, radius: Float): [Station]
   }
   
   type Station {
      id: ID
      stationID: String
      properties: Properties
      geometry: Geometry
      prices: Prices
      address: Address
   }
   
   type Properties {
      brand: String
      name: String
      operator: String
   }
   
   type Geometry {
      type: String
      coordinates: [Float]
   }
   
   type Prices {
      fuel95: Fuel
      fuel98: Fuel
      fuelDiesel: Fuel
   }
   
   type Address {
      house_number: String
      road: String
      city: String
      postcode: String
      country: String
   }
   
   input Bounds {
      s: Float!
      w: Float!
      n: Float!
      e: Float!
   }
   
   input Location {
      lon: Float!
      lat: Float!
   }
`;
