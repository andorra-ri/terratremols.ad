import type {
  Map,
  GeoJSONLayerOptions,
  PopupOptions,
  MapOptions as MMapOptions,
  MapLayerMouseEvent,
} from 'mapbox-composition';
import type { LegendControlOptions } from 'mapboxgl-legend';
import type { MaybeRef } from '/@/types';

export type { Map, PopupOptions, MapLayerMouseEvent };

export type MapOptions = {
  legend?: LegendControlOptions;
} & MMapOptions;

export type ImageOptions = {
  urls: Record<string, string>;
  content?: [number, number, number, number];
  stretchX?: [number, number][];
  stretchY?: [number, number][];
  sdf?: boolean,
} | Record<string, string>;

export type LayerOptions = MaybeRef<{
  images?: ImageOptions;
} & GeoJSONLayerOptions>;
