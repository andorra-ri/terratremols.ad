import { ref, computed, readonly } from 'vue';
import api from '/@/services/api.service';
import { closestPlace } from '/@/utils/geo';

const seisms = ref([]);

export default readonly(seisms);

export const loadSeisms = async () => {
  const response = await api.getSeisms();
  seisms.value = response.map(seism => {
    const {
      guid: id,
      coordinates: geometry,
      region: location,
      datetime,
      ...rest
    } = seism;
    const date = new Date(datetime);
    const from = closestPlace(geometry.coordinates);
    return { ...rest, id, geometry, date, location, from };
  });
};

export const useSeismFilter = filter => computed(() => seisms.value.filter(filter.value));

// Initial load of the seisms list
if (!seisms.value.length) loadSeisms();
