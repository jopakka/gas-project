'use strict';
import mongoose from 'mongoose';
import fuelSchema from './fuelModel';

export default mongoose.model('Fuel95', fuelSchema);