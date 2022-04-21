'use strict';
import mongoose from 'mongoose';
import {price, stationID} from '../utils/types';

const Schema = mongoose.Schema;

const fuelSchema = new Schema({
  stationID: stationID,
  price: price,
}, {timestamps: true});

export default fuelSchema;