import { ref, computed, readonly } from 'vue';
import SEISMS from '/@/assets/mock/seisms';
import { closestPlace } from '/@/utils/geo';

const seisms = ref([]);

export default readonly(seisms);

export const loadSeisms = async () => {
  seisms.value = SEISMS.map(seism => {
    const from = closestPlace(seism);
    return { ...seism, from };
  });
};

export const useSeismFilter = filter => computed(() => seisms.value.filter(filter.value));

// Initial load of the seisms list
if (!seisms.value.length) loadSeisms();
