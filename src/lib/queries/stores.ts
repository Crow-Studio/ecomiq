import { queryOptions } from "@tanstack/react-query";
import { getStoreFn, getStoresFn } from "~/fn/stores";

export const getStoresQuery = (user_id: string) =>
  queryOptions({
    queryKey: ["stores", user_id] as const,
    queryFn: ({ queryKey: [, sId] }) => getStoresFn({ data: { user_id: sId } }),
  });

export const getStoreQuery = (store_id: string) =>
  queryOptions({
    queryKey: ["store", store_id] as const,
    queryFn: ({ queryKey: [, sId] }) => getStoreFn({ data: { store_id: sId } }),
  });
