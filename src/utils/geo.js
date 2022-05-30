import getDistance from '@turf/distance';
import getBearing from '@turf/bearing';
import { round } from '/@/utils';

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

const LOCATIONS = [
  { name: 'Canillo', coordinates: [1.600978, 42.566368] },
  { name: 'Encamp', coordinates: [1.583651, 42.535970] },
  { name: 'Ordino', coordinates: [1.533006, 42.556897] },
  { name: 'Andorra la Vella', coordinates: [1.521882, 42.507472] },
  { name: 'Sant Julia de Lòria', coordinates: [1.492432, 42.468866] },
  { name: 'Escaldes-Engordany', coordinates: [1.539143, 42.510778] },
  { name: 'Pas de la Casa', coordinates: [1.733257, 42.542628] },
];

/* eslint-disable import/prefer-default-export */

export const closestPlace = coordinates => {
  const origin = LOCATIONS.reduce((acc, location) => {
    const distance = round(getDistance(location.coordinates, coordinates), 1);
    return !acc || distance < acc.distance ? { ...location, distance } : acc;
  }, null);
  const azimuth = (360 + getBearing(origin.coordinates, coordinates)) % 360;
  const direction = DIRECTIONS[Math.round(azimuth / 45)];
  return { ...origin, azimuth, direction };
};
