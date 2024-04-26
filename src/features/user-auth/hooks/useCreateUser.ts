import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";
import { handleServerResponse, serverErrorValidated } from "../util/helpers";

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

  const createUser = async (email: string, password: string) => {
    try {
      const response = await client.post({ email, password });
      return handleServerResponse(response);
    } catch (error: Error | unknown | any) {
      return {
        success: false,
        error: serverErrorValidated(error?.response?.data),
      };
    }
  };

  return createUser;
};

export default useCreateUser;
