import APIClient from "../../../lib/react-query/services/api-client";
import { TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";
import { devDebug } from "../util/helpers";
import useReactQuery from "../../../lib/react-query/useReactQuery";

// Create an  instance of the API client custom to login
const verifyClient = () => {
  const url: string = `/${USER_ENDPOINTS.verify}`;
  return new APIClient(url);
};

// Create a hook that makes the query to the API
const useVerifyToken = (runOnMount: boolean) => {
  const client = verifyClient();
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const refreshCookie = useCookie(TOKEN_NAMES.refresh);

  const verifyAuth = async () => {
    try {
      const result = await client.post({
        token: authCookie.value,
      });
      devDebug(
        "useVerifyToken auth token verification result status:",
        result.status
      );
      if (result.status === 200) {
        return {
          ...result,
          data: {
            verified: true,
            type: "auth",
          },
        };
      }
      devDebug(
        "useVerifyToken",
        "auth token verification failed. Attempting refresh token verification."
      );
      return verifyRefresh();
    } catch (e) {
      console.error("useVerifyToken verifyAuth error:", e);
    }
  };

  const verifyRefresh = async () => {
    try {
      const result = await client.post({
        token: refreshCookie.value,
      });
      devDebug(
        "useVerifyToken refresh token verification result status:",
        result.status
      );
      if (result.status === 200) {
        return {
          ...result,
          data: {
            verified: true,
            type: "refresh",
          },
        };
      }
      return {
        ...result,
        data: {
          verified: false,
          type: undefined,
        },
      };
    } catch (e) {
      console.error("useVerifyToken verifyRefresh error:", e);
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: USER_ENDPOINTS.verify.split("/"),
    queryFn: verifyAuth,
    enabled: runOnMount,
  });
};

export default useVerifyToken;
