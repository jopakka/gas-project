'use strict';
import FuelDiesel from '../models/fuelDiesel';

export default {
  Query: {
    fuelDiesel: async (parent, {stationID}) => {
      return FuelDiesel.findOne({stationID});
    },
  },
  Prices: {
    fuelDiesel: async (parent) => {
      const stationID = Object.keys(parent)[0];
      return FuelDiesel.findOne({stationID});
    },
  },
  Mutation: {
    updateDiesel: async (parent, {stationID, price}) => {
      const newDiesel = await FuelDiesel.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      return newDiesel.save();
    },
  },
};
