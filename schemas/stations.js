'use strict';
import {gql} from 'apollo-server-express';

export default gql`
   extend type Query {
     stationsByBounds(bounds: Bounds!): [Station]
     stationsAround(location: Location!, radius: Float): [Station]
   }
   
   type Station {
      id: String
      properties: Properties
      geometry: Geometry
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
