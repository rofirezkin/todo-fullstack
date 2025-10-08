import {
  T_ApiUpdateTodoResponse,
  Trq_UpdateTodo,
  updateTodo,
} from "@/services/api/update.todo";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseUpdateTodo = {
  options?: Partial<
    MutationOptions<T_ApiUpdateTodoResponse, T_AxiosBaseError, Trq_UpdateTodo>
  >;
};

export function useUpdateTodo({ options }: T_UseUpdateTodo = {}) {
  return useMutation({
    mutationFn: (payload) => updateTodo(payload),
    ...options,
  });
}
