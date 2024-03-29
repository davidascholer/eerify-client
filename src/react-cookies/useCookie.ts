import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

const useCookies = (name: string) => {
  const cookieName = useRef(name);
  const [cookieValue, setCookieValue] = useState<string>(
    Cookies.get(name) || ""
  );

  useEffect(() => {
    Cookies.set(cookieName.current, cookieValue);
  }, [cookieValue]);

  return {
    value: cookieValue,
    set: (value: string) => {
      setCookieValue(value);
    },
    refresh: () => {
      const newCookieValue = Cookies.get(name) || "";
      setCookieValue(newCookieValue);
    },
  };
};

export default useCookies;
