import type { Ref } from 'vue';
import type { Point, Position } from '@turf/helpers';

/* UTILITY TYPES */

export type MaybeRef<T> = T | Ref<T>;
export type MaybeArray<T> = T | T[];

/* DOMAIN TYPES */

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export type ClosestLocation = {
  name: string;
  distance: number;
  azimuth: number;
  coordinates: Position;
  direction: Direction;
};

export type Seism = {
  id: string;
  datetime: Date;
  magnitude: number;
  depth: number;
  region: string;
  from: ClosestLocation;
  coordinates: number[];
  geometry: Point;
};

export type FiltersSeism = {
  search: string;
  dateMin: Date,
  dateMax: Date,
  magnitude: [number, number];
};
