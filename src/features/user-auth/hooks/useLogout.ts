import { TOKEN_NAMES } from "../util/constants";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";

/*
  Delete the auth and refresh tokens from the cookies.
*/
const useLogout = () => {
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const refreshCookie = useCookie(TOKEN_NAMES.refresh);

  return () => {
    authCookie.remove();
    refreshCookie.remove();
    window.location.reload();
  };
};

export default useLogout;
