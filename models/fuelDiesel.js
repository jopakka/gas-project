'use strict';
import mongoose from 'mongoose';
import fuelSchema from './fuel';

export default mongoose.model('FuelDiesel', fuelSchema);