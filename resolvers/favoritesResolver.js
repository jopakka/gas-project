'use strict';

import {AuthenticationError} from 'apollo-server-express';
import Favorites from '../models/favoritesModel';
import {authErrorMessage} from '../utils/messages';

export default {
  Query: {
    favorite: async (parent, {stationID}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }
      return Favorites.findOne({stationID, userID: user._id});
    },
    favorites: async (parent, args, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }
      return Favorites.find({userID: user._id});
    },
  },
  Mutation: {
    addFavorite: async (parent, {stationID}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      const filter = {stationID, userID: user._id};
      const newFavorite = await Favorites.findOneAndUpdate(filter, filter,
          {new: true, upsert: true});
      return newFavorite.save();
    },
    deleteFavorite: async (parent, {stationID}, {user}) => {
      if (!user) {
        throw new AuthenticationError(authErrorMessage);
      }

      const filter = {stationID, userID: user._id};
      const deletion = await Favorites.findOneAndDelete(filter);
      return !!deletion;
    },
  },
};
