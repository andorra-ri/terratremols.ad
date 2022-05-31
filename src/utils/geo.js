import getDistance from '@turf/distance';
import getBearing from '@turf/bearing';
import { round } from '/@/utils';
import config from '/@/config.yaml';

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

/* eslint-disable import/prefer-default-export */

export const closestPlace = target => {
  const origin = Object.entries(config.locations)
    .reduce((acc, [name, coordinates]) => {
      const distance = round(getDistance(coordinates, target), 1);
      return !acc || distance < acc.distance ? { name, coordinates, distance } : acc;
    }, null);
  const azimuth = (360 + getBearing(origin.coordinates, target)) % 360;
  const direction = DIRECTIONS[Math.round(azimuth / 45)];
  return { ...origin, azimuth, direction };
};
