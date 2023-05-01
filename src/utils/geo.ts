import getDistance from '@turf/distance';
import getBearing from '@turf/bearing';
import type { Point } from '@turf/helpers';
import { round } from '/@/utils';
import config from '/@/config.yaml';

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

type Places = Record<string, [number, number]>;
type ClosestPlace = {
  name: string;
  coordinates: [number, number];
  distance: number;
};

export const closestPlace = (target: Point) => {
  const origin = Object.entries(config.locations as Places)
    .reduce((acc, [name, coordinates]) => {
      const distance = round(getDistance(coordinates, target), 1);
      return !acc || distance < acc.distance ? { name, coordinates, distance } : acc;
    }, null as ClosestPlace | null);
  const azimuth = (360 + getBearing(origin!.coordinates, target)) % 360;
  const direction = DIRECTIONS[Math.round(azimuth / 45)];
  return { ...origin, azimuth, direction };
};
