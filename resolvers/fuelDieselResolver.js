'use strict';
import FuelDiesel from '../models/fuelDieselModel';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';
import saveHistory from '../utils/saveHistory';
import {io} from '../utils/socket';
import History from '../models/historyModel';

export default {
  Query: {
    fuelDiesel: async (parent, {stationID}) => {
      return FuelDiesel.findOne({stationID});
    },
  },
  Prices: {
    fuelDiesel: async (parent) => {
      const result = await FuelDiesel.findOne({stationID: parent});
      if (result) {
        const history = await History.findOne({stationID: parent, type: '95'});
        result.historyID = history._id;
      }
      return result;
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

      const history = await saveHistory(stationID, user, price, saved, 'diesel');

      try {
        io.emit(`price ${stationID} diesel`,
            {price, updatedAt: saved.updatedAt, historyID: history._id});
      } catch (e) {
        console.error('socket', e);
      }
      return saved;
    },
  },
};
