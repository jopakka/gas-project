'use strict';
import FuelDiesel from '../models/fuelDieselModel';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';
import saveHistory from '../utils/saveHistory';
import {io} from '../utils/socket';

export default {
  Query: {
    fuelDiesel: async (parent, {stationID}) => {
      return FuelDiesel.findOne({stationID});
    },
  },
  Prices: {
    fuelDiesel: async (parent) => {
      return FuelDiesel.findOne({stationID: parent});
    },
  },
  Mutation: {
    updateDiesel: async (parent, {stationID, price}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      price = addDecimals(price);

      const newDiesel = await FuelDiesel.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      const saved = await newDiesel.save();

      await saveHistory(stationID, user, price, saved, 'diesel');

      try {
        io.emit(`price ${stationID} diesel`,
            {price, updatedAt: saved.updatedAt});
      } catch (e) {
        console.error('socket', e);
      }
      return saved;
    },
  },
};
