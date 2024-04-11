/*
yarn add js-cookie
yarn add -D @types/js-cookie
example use:
  // Inside of component
  const authCookie = useCookie("app-auth");
  const refreshCookie = useCookie("app-refresh");
  // Get value
  authCookie.value;
  // Set value
  authCookie.set(auth-token);
  // Refresh value in hook (useful for when cookie is updated outside of hook)
  authCookie.refresh();
*/
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useCookie = (name: string) => {
  const [cookieValue, setCookieValue] = useState<string>(
    Cookies.get(name) || ""
  );

  useEffect(() => {
    Cookies.set(name, cookieValue);
  }, [cookieValue, name]);

  return {
    value: cookieValue,
    set: (value: string) => {
      setCookieValue(value);
    },
    remove: () => {
      setCookieValue("");
      Cookies.remove(name);
    },
    refresh: () => {
      const newCookieValue = Cookies.get(name) || "";
      setCookieValue(newCookieValue);
    },
  };
};

export default useCookie;
