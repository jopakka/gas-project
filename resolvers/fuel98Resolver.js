'use strict';
import Fuel98 from '../models/fuel98Model';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';
import saveHistory from '../utils/saveHistory';
import {io} from '../utils/socket';

export default {
  Query: {
    fuel98: async (parent, {stationID}) => {
      return Fuel98.findOne({stationID});
    },
  },
  Prices: {
    fuel98: async (parent) => {
      return Fuel98.findOne({stationID: parent});
    },
  },
  Mutation: {
    update98: async (parent, {stationID, price}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      price = addDecimals(price);

      const new98 = await Fuel98.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      const saved = await new98.save();
      await saveHistory(stationID, user, price, saved, '98');

      try {
        io.emit(`price ${stationID} 98`,
            {price, updatedAt: saved.updatedAt});
      } catch (e) {
        console.error('socket', e);
      }
      return saved;
    },
  },
};
