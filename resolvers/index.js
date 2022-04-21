'use strict';
import stations from './stationsResolver';
import fuel95 from './fuel95Resolver';
import fuel98 from './fuel98Resolver';
import fuelDiesel from './fuelDieselResolver';
import user from './userResolver';
import favorites from './favoritesResolver';

export default [
  stations,
  fuel95,
  fuel98,
  fuelDiesel,
  user,
  favorites,
];
