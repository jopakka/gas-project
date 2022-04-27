'use strict';
import {AuthenticationError} from 'apollo-server-express';
import History from '../models/historyModel';

export default {
  Query: {
    userHistory: async (parent, {userID}, {user}) => {
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      return History.find({userID});
    },
    stationHistory: async (parent, {stationID, type}) => {
      const filter = type ? {stationID, type: type.toLowerCase()} : {stationID}
      return History.find(filter);
    },
  },
};