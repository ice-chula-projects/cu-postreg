import { ref } from "vue";
import * as CourseRegistration from "@/ts/CourseRegistration";
export interface GlobalState {
  id: string;
  loggedIn: boolean;
  coursesRegistered: CourseRegistration.Row[];
}

export const defaultState: GlobalState = {
  id: "",
  loggedIn: false,
  coursesRegistered: []
}

export const state = ref<GlobalState>(Object.assign({}, defaultState));
export function resetGlobalStateToDefault() { state.value = Object.assign({}, defaultState) }