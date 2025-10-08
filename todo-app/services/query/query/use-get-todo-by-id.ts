"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { T_AxiosBaseError } from "@/services/base-api";
import {
  getTodoById,
  T_ApiGetTodoByIdResponse,
  Trq_GetTodoById,
} from "@/services/api/get.todo-by-id";

export type T_UseGetTodoByIdProps = {
  params: Trq_GetTodoById;
  options?: Partial<
    UseQueryOptions<T_ApiGetTodoByIdResponse, T_AxiosBaseError>
  >;
};

export const GET_TODO_BYID = "getTodoById";

export function useGetTodoById({ params, options }: T_UseGetTodoByIdProps) {
  const query = useQuery<T_ApiGetTodoByIdResponse, T_AxiosBaseError>({
    queryKey: [GET_TODO_BYID, params],
    queryFn: () => getTodoById(params),
    ...options,
  });

  const data = useMemo(() => query.data?.data ?? null, [query.data]);

  return useMemo(() => ({ ...query, data }), [query, data]);
}
