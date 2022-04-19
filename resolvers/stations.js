'use strict';

import {getStationsAround, getStationsByBounds} from '../utils/overpass';

export default {
  Query: {
    stationsByBounds: async (parent, {bounds}) => {
      console.log('stationsByBounds bounds', bounds);
      return await getStationsByBounds(bounds);
    },
    stationsAround: async (parent, {location, radius}) => {
      console.log('stationsAround args', location, radius);
      return await getStationsAround(location, radius);
    },
  },
};
