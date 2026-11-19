import { ref } from "vue";

export interface GlobalState{
  name: string;
  id: string;
  loggedIn: boolean;
}

export const state = ref<GlobalState>({name: "", id: "", loggedIn: false})