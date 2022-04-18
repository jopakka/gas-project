'use strict';
import overpass from 'query-overpass';

const addressKeys = [
  'city',
  'housenumber',
  'postcode',
  'street',
  'country',
];

const fuelKeys = [
  'diesel',
  'e10',
  'lpg',
  'octane_95',
  'octane_98',
  'e85',
];

const options = {
  flatProperties: true,
  overpassUrl: 'https://overpass.kumi.systems/api/interpreter',
};

const getStationsByBounds = (bounds) => {
  return new Promise((resole, reject) => {
    overpass(
        `[out:json];
          (
            node["amenity"="fuel"](${bounds.s},${bounds.w},${bounds.n},${bounds.e});
            way["amenity"="fuel"](${bounds.s},${bounds.w},${bounds.n},${bounds.e});
          );
          out;>;out skel;
        `,
        (err, data) => {
          if (err) return reject(err);
          const stations = data.features;
          resole(stations);
        }, options);
  });
};

export {
  getStationsByBounds,
};