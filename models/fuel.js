'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fuelSchema = new Schema({
  stationID: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
}, {timestamps: true});

export default fuelSchema;