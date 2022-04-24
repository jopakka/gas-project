'use strict';

import {
  getStation,
  getStationsAround,
  getStationsByBounds,
} from '../utils/overpass';
import Fuel95 from '../models/fuel95Model';
import Fuel98 from '../models/fuel98Model';
import FuelDiesel from '../models/fuelDieselModel';
import nominatim from '../utils/nominatim';

const getAddressInfo = async (station) => {
  const coords = station.geometry.coordinates;
  station.address = (await nominatim(coords[0], coords[1])).address;
};

export default {
  Query: {
    station: async (parent, {id}) => {
      const station = (await getStation(id))[0];
      station.prices = station.id
      await getAddressInfo(station);
      return station;
    },
    stationsByBounds: async (parent, {bounds}) => {
      const stations = await getStationsByBounds(bounds);
      await Promise.all(stations.map(async (s) => s.prices = s.id));
      return stations;
    },
    stationsAround: async (parent, {location, radius}) => {
      const stations = await getStationsAround(location, radius);
      await Promise.all(stations.map(async (s) => s.prices = s.id));
      return stations;
    },
  },
};
