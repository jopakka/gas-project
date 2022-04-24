'use strict';
import mongoose from 'mongoose';
import {price, stationID, userID} from '../utils/types';

const Schema = mongoose.Schema;

const fuelSchema = new Schema({
  stationID: stationID,
  price: price,
  userID: userID,
}, {timestamps: true});

export default fuelSchema;