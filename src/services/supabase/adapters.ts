import type { Seism as SeismDTO } from './types';
import type { Seism } from '/@/types';
import { closestLocation } from '/@/utils';
import config from '/@/config.yaml';

export const adaptSeism = (seism: SeismDTO): Seism => {
  const { guid: id, coordinates: geometry, ...rest } = seism;
  const datetime = new Date(seism.datetime);
  const from = closestLocation(geometry.coordinates, config.locations);
  return { ...rest, id, geometry, datetime, from };
};
