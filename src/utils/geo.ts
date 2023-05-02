import distance from '@turf/distance';
import bearing from '@turf/bearing';
import type { Position } from '@turf/helpers';

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'] as const;

export const closestLocation = (target: Position, locations: Record<string, Position>) => {
  const [closest] = Object.entries(locations)
    .map(([name, coordinates]) => ({ name, coordinates, distance: distance(coordinates, target) }))
    .sort((a, b) => a.distance - b.distance);
  const azimuth = (360 + bearing(closest.coordinates, target)) % 360;
  const direction = DIRECTIONS[Math.round(azimuth / 45)];
  return { ...closest, azimuth, direction };
};
