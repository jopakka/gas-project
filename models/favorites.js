'use strict';
import mongoose from 'mongoose';
import {stationID} from '../utils/types';

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  stationID: stationID,
}, {timestamps: true});

export default mongoose.model('Favorite', favoriteSchema);