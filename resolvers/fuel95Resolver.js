'use strict';
import Fuel95 from '../models/fuel95Model';
import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import {addDecimals} from '../utils/validators';
import saveHistory from '../utils/saveHistory';
import {io} from '../utils/socket';
import History from '../models/historyModel';

export default {
  Query: {
    fuel95: async (parent, {stationID}) => {
      return Fuel95.findOne({stationID});
    },
  },
  Prices: {
    fuel95: async (parent) => {
      const result = await Fuel95.findOne({stationID: parent});
      if (result) {
        const history = await History.findOne({stationID: parent, type: '95'});
        result.historyID = history._id;
      }
      return result;
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

      const history = await saveHistory(stationID, user, price, saved, '95');

      try {
        io.emit(`price ${stationID} 95`,
            {price, updatedAt: saved.updatedAt, historyID: history._id});
      } catch (e) {
        console.error('socket', e);
      }

      return saved;
    },
  },
};
