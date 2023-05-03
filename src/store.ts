import { reactive } from 'vue';
import supabase from '/@/services/supabase';
import type { Seism } from '/@/types';

type State = {
  seisms: Seism[];
};

const state = reactive<State>({
  seisms: [],
});

const loadSeisms = async () => {
  state.seisms = await supabase.getSeisms();
};

export default {
  state,
  loadSeisms,
};
