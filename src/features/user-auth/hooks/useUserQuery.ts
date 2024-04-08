/*
 Try to get the user from the API. If it fails, the user is most likely not logged in.
*/
import { useQuery } from "@tanstack/react-query";
import { UserReturnType } from "../models/userAuthTypes";
import APIClient from "../../../lib/react-query/services/api-client";

// Create an  instance of the API client custom to login
const userClient = (endpoint: string, authToken: string) => {
  const url: string = `/${endpoint}`;
  const client = new APIClient<UserReturnType>(url, authToken);
  return client;
};

// Create a hook that makes the query to the API
const useUserQuery = (
  endpoint: string,
  authToken: string,
  initialLoad: boolean = true // default
) => {
  const service = userClient(endpoint, authToken);
  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useQuery({
    queryKey: endpoint.split("/"),
    queryFn: () =>
      service.getAll({
        params: {},
      }),
    enabled: initialLoad, // disable this query from automatically running
  });
};

export default useUserQuery;
