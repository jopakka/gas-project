'use strict';

import {getStationsByBounds} from '../utils/overpass';

export default {
  Query: {
    stations: async (parent, args) => {
      console.log('stations args', args);
      const data = await getStationsByBounds(args.bounds)
      return data;
    },
  },
};
