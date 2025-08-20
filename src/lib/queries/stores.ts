import { queryOptions } from "@tanstack/react-query";
import { getStoresFn } from "~/fn/stores";

export const getStoresQuery = (user_id: string) =>
  queryOptions({
    queryKey: ["stores", user_id] as const,
    queryFn: ({ queryKey: [, sId] }) => getStoresFn({ data: { user_id: sId } }),
  });
