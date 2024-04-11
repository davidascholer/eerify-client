import useReactQuery from "../../../lib/react-query/useReactQuery";
import APIClient from "../../../lib/react-query/services/api-client";
import { FormikObjectValuesProps, TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";

// Create an  instance of the API client custom to login
const loginClient = () => {
  const url: string = `/${USER_ENDPOINTS.create}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get login credentials. Then, place them in cookies upon success.
*/
const useLogin = (postData: FormikObjectValuesProps, runOnMount: boolean) => {
  const client = loginClient();
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const refreshCookie = useCookie(TOKEN_NAMES.refresh);

  const login = async () => {
    const response = await client.post(postData);
    const { access, refresh } = response.data as {
      access: string;
      refresh: string;
    };
    if (!!access && !!refresh && response.status === 200) {
      authCookie.set(access);
      refreshCookie.set(refresh);
    } else {
      return new Error("Invalid login credentials");
    }
    return response;
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: USER_ENDPOINTS.create.split("/"),
    queryFn: login,
    enabled: runOnMount,
  });
};

export default useLogin;
