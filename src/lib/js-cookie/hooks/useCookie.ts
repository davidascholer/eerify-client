/*
dependencies:
yarn add js-cookie
yarn add -D @types/js-cookie
*/

/*
Return the current cookie value, set a new cookie value, or remove the cookie.
All return the updated cookie value.
*/
import Cookies from "js-cookie";

const useCookie = (name: string) => {
  return {
    get: async () => {
      const currentCookie = await Cookies.get(name);
      return currentCookie || "";
    },
    set: async (cookieValue: string) => {
      await Cookies.set(name, cookieValue);
      const currentCookie = await Cookies.get(name);
      return currentCookie || "";
    },
    remove: async () => {
      await Cookies.remove(name);
      const currentCookie = await Cookies.get(name);
      return currentCookie || "";
    },
  };
};

export default useCookie;
