'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    min: [5],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);