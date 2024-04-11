import useReactQuery from "../../../lib/react-query/useReactQuery";
import APIClient from "../../../lib/react-query/services/api-client";
import { TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";
import { devDebug } from "../util/helpers";

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
    try {
      const response = await client.post({ refresh: refreshCookie.value });
      devDebug("useRefreshToken response status:", response.status);
      const { access } = response.data as {
        access: string;
      };
      if (response.status === 200) {
        devDebug("useRefreshToken replaced auth token:", access);
        authCookie.set(access);
      } else {
        return new Error("Invalid login credentials");
      }
      return response;
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
