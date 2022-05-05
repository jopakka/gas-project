'use strict';
import Fuel98 from '../models/fuel98Model';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';
import saveHistory from '../utils/saveHistory';
import {io} from '../utils/socket';
import History from '../models/historyModel';

export default {
  Query: {
    fuel98: async (parent, {stationID}) => {
      return Fuel98.findOne({stationID});
    },
  },
  Prices: {
    fuel98: async (parent) => {
      const result = await Fuel98.findOne({stationID: parent});
      if (result) {
        const history = await History.findOne({stationID: parent, type: '95'});
        result.historyID = history._id;
      }
      return result;
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
      const history = await saveHistory(stationID, user, price, saved, '98');

      try {
        io.emit(`price ${stationID} 98`,
            {price, updatedAt: saved.updatedAt, historyID: history._id});
      } catch (e) {
        console.error('socket', e);
      }
      return saved;
    },
  },
};
