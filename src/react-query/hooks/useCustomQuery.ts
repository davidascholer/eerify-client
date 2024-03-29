/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import userService from "../user/services/userService";

const useCustomQuery = (slug: object, queryKeys: string[]) =>
  useQuery({
    queryKey: queryKeys,
    queryFn: () =>
      userService.getAll({
        params: slug,
      }),
  });

export default useCustomQuery;
