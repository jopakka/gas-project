'use strict';
import mongoose from 'mongoose';
import {stationID, userID} from '../utils/types';

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userID: userID,
  stationID: stationID,
}, {timestamps: true});

export default mongoose.model('Favorite', favoriteSchema);