import useCookies from "../../../lib/js-cookie/hooks/useCookie";
import useUserQuery from "./useUserQuery";
import USER_ENDPOINTS from "../util/endpoints";
import { useEffect, useRef, useState } from "react";
import { TOKEN_NAMES } from "../util/constants";

/*
  This hook is used to automatically login the user when called from a component.
  It will check if the user has a valid auth token and refresh token.
  If the user has a valid auth token, it will fetch the user data.
  If the user has a valid refresh token, it will refresh the auth token.
  If the user has neither, it will return an error.
*/
const useAutoLogin = (initialLoad: boolean = true) => {
  const authCookie = useCookies(TOKEN_NAMES.auth);
  const refreshCookie = useCookies(TOKEN_NAMES.refresh);
  const { data, status, error, refetch } = useUserQuery(
    USER_ENDPOINTS.me,
    authCookie.value,
    initialLoad
  );

  const [userStatus, setUserStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("idle");
  const [userData, setUserData] = useState<typeof data | undefined>(undefined);
  const [userError, setUserError] = useState<typeof error | undefined>(
    undefined
  );

  useEffect(() => {
    setUserStatus(status);
    setUserData(data);
    setUserError(error);
  }, [status, data, error]);

  return {
    data: userData,
    status: userStatus,
    error: userError,
    refetch,
  };
};

export default useAutoLogin;
