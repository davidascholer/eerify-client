/*
- 5 minute auth token from server
- 30 day refresh token from server
- if auth token expires, use refresh token to get new auth token
- if refresh token within but not past 1 week, refresh refresh token
*/
import useReactQuery from "../../../lib/react-query/useReactQuery";
import APIClient from "../../../lib/react-query/services/api-client";
import { TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";
import { devDebug } from "../util/helpers";
import { jwtDecode } from "jwt-decode";

// Create an  instance of the API client custom to login
const refreshTokenClient = () => {
  const url: string = `/${USER_ENDPOINTS.refresh}`;
  const client = new APIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useRefreshToken = () => {
  const client = refreshTokenClient();
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const refreshCookie = useCookie(TOKEN_NAMES.refresh);

  const resetAuthToken = async () => {
    const refreshToken = await refreshCookie.get();
    try {
      // Decode the expiration.
      const decodedToken: {
        token_type: string;
        exp: number;
        iat: number;
        jti: string;
        user_id: number;
      } = jwtDecode(refreshToken);
      const date = new Date();
      // JWT stores the expiration in seconds, so we need to convert it to milliseconds.
      const expiration = new Date(decodedToken.exp * 1000);
      // Calculate the difference between the current date and the expiration date.
      const difference = expiration.getTime() - date.getTime();
      // Check if the expiration is within but not past one week.
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const withinOneWeek = difference < oneWeek && difference > 0;
      // Todo: Implement the logic to refresh the refresh token.
      devDebug("useRefreshToken withinOneWeek:", withinOneWeek);

      const response = await client.post({ refresh: refreshToken });
      devDebug("useRefreshToken response status:", response.status);
      const { access } = response.data as {
        access: string;
      };
      if (response.status === 200) {
        devDebug("useRefreshToken replaced auth token:", access);
        const newCookie = await authCookie.set(access);
        return { ...response, newCookie };
      } else {
        return new Error("Invalid login credentials");
      }
    } catch (e) {
      devDebug("useRefreshToken error:", e);
      return e;
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: USER_ENDPOINTS.refresh.split("/"),
    queryFn: resetAuthToken,
    enabled: false,
  });
};

export default useRefreshToken;
