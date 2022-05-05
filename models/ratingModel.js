'use strict';
import mongoose from 'mongoose';
import {userID} from '../utils/types';

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  historyID: {
    type: String,
    required: true,
  },
  userID,
  rating: {
    type: Number,
    enum: [-1, 0, 1],
    required: true,
  },
});

export default mongoose.model('Rating', ratingSchema);