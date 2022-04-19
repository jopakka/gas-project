'use strict';
import Fuel98 from '../models/fuel98';

export default {
  Query: {
    fuel98: async (parent, {stationID}) => {
      return Fuel98.findOne({stationID});
    },
  },
  Prices: {
    fuel98: async (parent) => {
      const stationID = Object.keys(parent)[0];
      return Fuel98.findOne({stationID});
    },
  },
  Mutation: {
    update98: async (parent, {stationID, price}) => {
      const new98 = await Fuel98.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      return new98.save();
    },
  },
};
