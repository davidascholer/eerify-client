/*
 Try to get the user from the API. 
*/
import useReactQuery from "../../../lib/react-query/useReactQuery";
import { UserReturnType } from "../models/interfaces";
import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";
import { SIMPLE_JWT_TOKEN_PREFIX, TOKEN_NAMES } from "../util/constants";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";
import { devDebug } from "../util/helpers";

// Create an  instance of the API client custom to login
const userClient = (authToken: string) => {
  const url: string = `/${USER_ENDPOINTS.me}`;
  // 'JWT ' prefix is needed for the server to recognize the token
  const client = new APIClient<UserReturnType>(
    url,
    SIMPLE_JWT_TOKEN_PREFIX + authToken
  );
  return client;
};

// Create a hook that makes the query to the API
const useUserQuery = () => {
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const client = userClient(authCookie.value);

  const getUser = async () => {
    try {
      const result = await client.get();
      devDebug("useGetUser getUser status:", result.status);
      devDebug("useGetUser getUser data:", result.data);
      if (result.status === 200) {
        return result;
      }
      return { verified: false };
    } catch (e) {
      console.error("useGetUser error:", e);
      return e;
    }
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: USER_ENDPOINTS.me.split("/"),
    queryFn: getUser,
    enabled: false, // disable this query from automatically running
  });
};

export default useUserQuery;
