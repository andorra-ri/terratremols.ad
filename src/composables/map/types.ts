import type {
  Map,
  GeoJSONLayerOptions,
  PopupOptions,
  MapOptions as MMapOptions,
  MapMouseEvent,
} from 'mapbox-composition';
import type { LegendControlOptions } from 'mapboxgl-legend';
import type { MaybeRef } from '/@/types';

export type { Map, PopupOptions, MapMouseEvent };

export type MapOptions = {
  legend?: LegendControlOptions;
} & MMapOptions;

export type LayerOptions = MaybeRef<GeoJSONLayerOptions>;
