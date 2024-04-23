import APIClient from "../../../lib/react-query/services/api-client";
import { TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";
import { devDebug } from "../util/helpers";

// Create an  instance of the API client custom to create a user
const createUserClient = () => {
  const url: string = `/${USER_ENDPOINTS.createUser}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get create a user.
*/
const useCreateUser = () => {
  const client = createUserClient();
  const authCookie = useCookie(TOKEN_NAMES.auth);

  const createUser = async (email: string, password: string) => {
    const response = await client.post({ email, password });
    devDebug("useCreateUser response", response);
    const { access } = response.data as {
      access: string;
    };
    if (!!access && response.status === 200) {
      authCookie.set(access);
    } else {
      return new Error("Unable to create user.");
    }
    return response;
  };

  return createUser;
};

export default useCreateUser;
