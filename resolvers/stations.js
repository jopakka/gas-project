'use strict';

import {getStationsAround, getStationsByBounds} from '../utils/overpass';
import Fuel95 from '../models/fuel95';
import Fuel98 from '../models/fuel98';
import FuelDiesel from '../models/fuelDiesel';

const getFuelPrices = async (station) => {
  station.prices = {
    [station.id]: await Fuel95.find(),
    [station.id]: await Fuel98.find(),
    [station.id]: await FuelDiesel.find(),
  };
};

export default {
  Query: {
    stationsByBounds: async (parent, {bounds}) => {
      const stations = await getStationsByBounds(bounds);
      await Promise.all(stations.map(getFuelPrices));
      return stations;
    },
    stationsAround: async (parent, {location, radius}) => {
      const stations = await getStationsAround(location, radius);
      await Promise.all(stations.map(getFuelPrices));
      return stations;
    },
  },
};
