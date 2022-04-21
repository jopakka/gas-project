'use strict';
import mongoose from 'mongoose';
import {price, stationID, userID} from '../utils/types';

const Schema = mongoose.Schema;

const historySchema = new Schema({
  stationID: stationID,
  userID: userID,
  price: price,
  type: {
    type: String,
    enum: ['95', '98', 'diesel'],
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

export default mongoose.model('History', historySchema);