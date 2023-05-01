import type { Point } from '@turf/helpers';

export type ClosestLocation = {
  name: string;
  distance: number;
  azimuth: number;
  coordinates: [number, number];
  direction: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
};

export type Seism = {
  id: string;
  date: Date;
  magnitude: number;
  depth: number;
  location: string;
  from: ClosestLocation;
  geometry: Point;
};
