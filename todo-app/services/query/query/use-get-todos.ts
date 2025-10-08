import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { T_AxiosBaseError } from "@/services/base-api";
import { getTodos, T_ApiGetTodosResponse } from "@/services/api/get.todos";

export type T_UseGetTodosOptions = Partial<
  UseQueryOptions<T_ApiGetTodosResponse, T_AxiosBaseError>
>;

export const GET_TODOS = "getTodos";

export function useGetTodos({
  options,
}: { options?: T_UseGetTodosOptions } = {}) {
  const query = useQuery<T_ApiGetTodosResponse, T_AxiosBaseError>({
    queryKey: [GET_TODOS],
    queryFn: getTodos,
    ...options,
  });

  const data = useMemo(() => query.data?.data ?? [], [query.data]);

  return useMemo(() => ({ ...query, data }), [query, data]);
}
