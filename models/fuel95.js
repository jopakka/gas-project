'use strict';
import mongoose from 'mongoose';
import fuelSchema from './fuel';

export default mongoose.model('Fuel95', fuelSchema);