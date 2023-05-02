import { useAsync } from 'mapbox-composition';
import { Deferred, bounds, type GeoJSONObject, type Featureable } from '/@/utils';
import type { Map } from './types';

type FitOptions = {
  bearing?: number;
  padding?: number;
  pitch?: number;
  speed?: number;
};

export default (map: Deferred<Map>) => {
  const fitTo = async (features: GeoJSONObject | Featureable[], options?: FitOptions) => {
    const resolved = await map.promise;
    const { fitBounds } = useAsync(resolved);
    fitBounds(bounds(features), options);
  };
  return { fitTo };
};
