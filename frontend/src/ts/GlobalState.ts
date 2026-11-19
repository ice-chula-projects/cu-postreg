import { ref } from "vue";

export interface GlobalState {
  id: string;
  loggedIn: boolean;
}

export const defaultState: GlobalState = {
  id: "",
  loggedIn: false
}

export const state = ref<GlobalState>(Object.assign({}, defaultState));
export function resetGlobalStateToDefault() { state.value = Object.assign({}, defaultState) }