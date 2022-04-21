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
  },
};