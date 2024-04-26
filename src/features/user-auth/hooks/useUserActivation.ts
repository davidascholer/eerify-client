import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";
import { devDebug } from "../util/helpers";

// Create an  instance of the API client custom to create a user
const activateUserClient = () => {
  const url: string = `/${USER_ENDPOINTS.activate}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get create a user.
*/
const useUserActivation = () => {
  const client = activateUserClient();

  const activateUser = async (uid: string, token: string) => {
    const response = await client.post({
      uid: uid,
      token: token,
    });

    devDebug("useUserActivation response", response);
    devDebug("useUserActivation response keys", Object.keys(response));

    // Any 20x status code is acceptable
    if (response.status >= 200 && response.status < 209) {
      return { success: true, message: "Activation Successful" };
    } else {
      return { success: false, message: "Activation Link Expired or Invalid" };
    }
  };

  return activateUser;
};

export default useUserActivation;
