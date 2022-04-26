'use strict';
import Fuel95 from '../models/fuel95Model';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';
import saveHistory from '../utils/saveHistory';
import {socket} from '../utils/socket';

export default {
  Query: {
    fuel95: async (parent, {stationID}) => {
      return Fuel95.findOne({stationID});
    },
  },
  Prices: {
    fuel95: async (parent) => {
      return Fuel95.findOne({stationID: parent});
    },
  },
  Mutation: {
    update95: async (parent, {stationID, price}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      price = addDecimals(price);

      const new95 = await Fuel95.findOneAndUpdate(
          {stationID},
          {price},
          {new: true, upsert: true});
      const saved = await new95.save();

      await saveHistory(stationID, user, price, saved, '95');

      socket.emit(`price ${stationID} 95`, {price, updatedAt: saved.updatedAt});

      return saved;
    },
  },
};
