import { store } from "../lib/redux-toolkit/store";

export function isLoggedIn() {
  const { email } = store.getState().user;
  return !!email;
}
