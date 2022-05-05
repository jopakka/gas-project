'use strict';

import {AuthenticationError} from 'apollo-server-express';
import {authErrorMessage} from '../utils/messages';
import Rating from '../models/ratingModel';
import {io} from '../utils/socket';

const getRating = async (historyID) => {
  const ratings = await Rating.find({historyID});
  return ratings.reduce((prev, current) => {
    return prev + current.rating;
  }, 0);
}

export default {
  Query: {
    rating: async (parent, {historyID}) => {
      return getRating(historyID)
    },
  },
  Fuel: {
    rating: async (parent) => {
      return getRating(parent.historyID)
    },
  },
  Mutation: {
    addRating: async (parent, {historyID, rating}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      const newRating = await Rating.findOneAndUpdate(
          {historyID, userID: user._id},
          {rating},
          {new: true, upsert: true},
      );
      const saved = await newRating.save();

      try {
        io.emit(`rating ${historyID}`, await getRating(historyID));
      } catch (e) {
        console.error('socket', e);
      }

      return saved;
    },
  },
};
