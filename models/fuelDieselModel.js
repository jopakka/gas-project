'use strict';
import mongoose from 'mongoose';
import fuelSchema from './fuelModel';

export default mongoose.model('FuelDiesel', fuelSchema);