import useReactQuery from "../../../lib/react-query/useReactQuery";
import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";

// Create an  instance of the API client custom to request a password reset
const loginClient = () => {
  const url: string = `/${USER_ENDPOINTS.createUser}`; // todo: enter appropriate endpoint
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to send a password reset email.
*/
const useRequestPasswordReset = (uuid: string, email: string) => {
  const client = loginClient();

  const requestPasswordReset = async () => {
    const response = await client.post({ uid: uuid, token: email });
    if (response.status === 200) {
      // Do something in needed.
    } else {
      return new Error("Unable to request password reset.");
    }
    return response;
  };

  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useReactQuery({
    queryKey: USER_ENDPOINTS.createUser.split("/"),
    queryFn: requestPasswordReset,
    enabled: false,
  });
};

export default useRequestPasswordReset;
