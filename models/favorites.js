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
    validate: {
      validator: (v) => {
        const types = ['node', 'way']
        const [type, id] = v.split('/')
        if(!types.includes(type)) return false
        return /^\d*$/.test(id)
      },
      message: props => `${props.value} is not a station ID!`
    }
  },
}, {timestamps: true});

export default mongoose.model('Favorite', favoriteSchema);