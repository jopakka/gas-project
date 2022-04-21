'use strict';
import FuelDiesel from '../models/fuelDieselModel';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';

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
    updateDiesel: async (parent, {stationID, price}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      price = addDecimals(price)

      const newDiesel = await FuelDiesel.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      return newDiesel.save();
    },
  },
};
