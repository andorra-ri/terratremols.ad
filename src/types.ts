import type { Ref } from 'vue';
import type { Geometry, Point, Position } from '@turf/helpers';

/* UTILITY TYPES */

export type MaybeRef<T> = T | Ref<T>;
export type MaybeArray<T> = T | T[];

export type Replace<O extends object, T extends object> = O & Omit<T, keyof O>;

/* DOMAIN TYPES */
export type { Geometry, Point };

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export type Station = {
  id: string;
  name: string;
  coordinates: Position;
};

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
  report?: string;
};

export type FiltersSeism = {
  search: string;
  dateMin: Date,
  dateMax: Date,
  magnitude: [number, number];
};

export type SeismReport = {
  id: string;
  url: string;
};

export type NewsFeedStory = {
  id: string;
  text: string;
  createdAt: string;
};

export type LearnCategory = 'BASICS' | 'IN_ANDORRA' | 'ACTIVITY' | 'HAZARDS';

export type LearnDocument = {
  name: string;
  category: LearnCategory
  url: string;
  order: number;
};
