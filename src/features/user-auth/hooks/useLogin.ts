import APIClient from "../../../lib/react-query/services/api-client";
import { AuthFormValues, TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";
import {
  devDebug,
  handleServerResponse,
  serverErrorValidated,
} from "../util/helpers";

// Create an  instance of the API client custom to login
const loginClient = () => {
  const url: string = `/${USER_ENDPOINTS.login}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get login credentials. Then, place them in cookies upon success.
*/
const useLogin = (postData: AuthFormValues) => {
  const client = loginClient();
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const refreshCookie = useCookie(TOKEN_NAMES.refresh);

  const login = async () => {
    try {
      const response = await client.post({
        email: postData.email,
        password: postData.password,
      });
      devDebug("useLogin response", response);
      if (response?.data?.access && response?.data?.refresh) {
        const { access, refresh } = response?.data as {
          access: string;
          refresh: string;
        };
        authCookie.set(access);
        refreshCookie.set(refresh);
      }
      return handleServerResponse(response);
    } catch (error: any) {
      console.debug("error");
      console.debug(error);
      devDebug("useLogin response error", error);
      return {
        success: false,
        data: {},
        error: serverErrorValidated(error?.response?.data),
      };
    }
  };

  return login;
};

export default useLogin;
