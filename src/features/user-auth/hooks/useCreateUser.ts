import useReactQuery from "../../../lib/react-query/useReactQuery";
import APIClient from "../../../lib/react-query/services/api-client";
import { FormikObjectValuesProps, TOKEN_NAMES } from "../util/constants";
import USER_ENDPOINTS from "../util/endpoints";
import useCookie from "../../../lib/js-cookie/hooks/useCookie";

// Create an  instance of the API client custom to create a user
const loginClient = () => {
  const url: string = `/${USER_ENDPOINTS.createUser}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get create a user.
*/
const useCreateUser = (postData: FormikObjectValuesProps) => {
  const client = loginClient();
  const authCookie = useCookie(TOKEN_NAMES.auth);

  const createUser = async () => {
    const response = await client.post(postData);
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

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: USER_ENDPOINTS.createUser.split("/"),
    queryFn: createUser,
    enabled: false,
  });
};

export default useCreateUser;
