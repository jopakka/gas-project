'use strict';
import mongoose from 'mongoose';
import fuelSchema from './fuel';

export default mongoose.model('Fuel98', fuelSchema);