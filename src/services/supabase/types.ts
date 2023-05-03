import type { Point } from '@turf/helpers';

export type Seism = {
  guid: string;
  coordinates: Point;
  datetime: string;
  depth: number;
  magnitude: number;
  region: string;
};
