'use strict';
import Fuel95 from '../models/fuel95';

export default {
  Query: {
    fuel95: async (parent, {stationID}) => {
      return Fuel95.findOne({stationID});
    },
  },
  Prices: {
    fuel95: async (parent) => {
      const stationID = Object.keys(parent)[0];
      return Fuel95.findOne({stationID});
    },
  },
  Mutation: {
    update95: async (parent, {stationID, price}) => {
      const new95 = await Fuel95.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      return new95.save();
    },
  },
};
