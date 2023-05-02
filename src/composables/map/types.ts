import type {
  Map,
  GeoJSONLayerOptions,
  PopupOptions,
  MapOptions,
  MapMouseEvent,
} from 'mapbox-composition';
import type { MaybeRef } from '/@/types';

export type { Map, MapOptions, PopupOptions, MapMouseEvent };

export type LayerOptions = MaybeRef<GeoJSONLayerOptions>;
