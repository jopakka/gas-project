'use strict';
import overpass from 'query-overpass';
import axios from 'axios';
import qs from 'querystring';

const options = {
  flatProperties: true,
  overpassUrl: 'https://overpass.kumi.systems/api/interpreter',
};

const mapKeyValues = (station, filter) => {
  const keys = Object.keys(station.properties).filter(k => k.includes(filter));
  console.log('keys', keys);
};

const getStationsByBounds = (bounds) => {
  return new Promise((resolve, reject) => {
    overpass(
        `[out:json];
          nw["amenity"="fuel"](${bounds.s},${bounds.w},${bounds.n},${bounds.e});
          out center qt;
        `,
        (err, data) => {
          if (err) return reject(err);
          const stations = data.features;
          resolve(stations);
        }, options);
  });
};

const getStationsAround = (location, radius = 10000) => {
  return new Promise(async (resolve, reject) => {
    overpass(
        `[out:json];
          nw["amenity"="fuel"](around:${radius},${location.lat},${location.lon});
          out center qt;
        `,
        (err, data) => {
          if (err) return reject(err);
          const stations = data.features;
          resolve(stations);
        }, options);
  });
};

export {
  getStationsByBounds,
  getStationsAround,
};