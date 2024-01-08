import distance from '@turf/distance';
import bearing from '@turf/bearing';
import bbox from '@turf/bbox';
import { point, feature, featureCollection, type GeoJSONObject, type Position, type Geometry } from '@turf/helpers';

export type { GeoJSONObject };

export type Featureable = {
  geometry: Geometry,
  properties?: object,
};

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'] as const;

export const toPoint = point;

export const toFeatureCollection = (items: Featureable[]) => {
  const features = items.map(item => {
    const { geometry, properties, ...rest } = item;
    return feature(geometry, properties ?? rest);
  });
  return featureCollection(features);
};

export const bounds = (item: GeoJSONObject | Featureable[]) => {
  const geojson = Array.isArray(item) ? toFeatureCollection(item) : item;
  return bbox(geojson);
};

export const closestLocation = (target: Position, locations: Record<string, Position>) => {
  const [closest] = Object.entries(locations)
    .map(([name, coordinates]) => ({ name, coordinates, distance: distance(coordinates, target) }))
    .sort((a, b) => a.distance - b.distance);
  const azimuth = (360 + bearing(closest.coordinates, target)) % 360;
  const direction = DIRECTIONS[Math.round(azimuth / 45)];
  return { ...closest, azimuth, direction };
};
