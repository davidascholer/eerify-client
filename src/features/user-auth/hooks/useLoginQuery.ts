import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../lib/react-query/services/api-client";
import { FormikObjectValuesProps } from "../util/constants";

// Create an  instance of the API client custom to login
const loginClient = (endpoint: string) => {
  const url: string = `/${endpoint}`;
  const client = new APIClient(url);
  return client;
};

// Create a hook that makes the query to the API
const useLoginQuery = (endpoint: string, postData: FormikObjectValuesProps) => {
  console.debug("useLoginQuery", endpoint, postData);
  const client = loginClient(endpoint);
  // https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  return useQuery({
    queryKey: endpoint.split("/"),
    queryFn: () => client.post(postData),
    enabled: false, // disable this query from automatically running
  });
};

export default useLoginQuery;
