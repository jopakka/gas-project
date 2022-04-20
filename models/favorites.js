'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  stationID: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export default mongoose.model('Favorite', favoriteSchema);