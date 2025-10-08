import {
  deleteTodo,
  T_ApiDeleteTodoResponse,
  Trq_DeleteTodo,
} from "@/services/api/delete.todo";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseDeleteTodo = {
  options?: Partial<
    MutationOptions<T_ApiDeleteTodoResponse, T_AxiosBaseError, Trq_DeleteTodo>
  >;
};

export function useDeleteTodo({ options }: T_UseDeleteTodo = {}) {
  return useMutation({
    mutationFn: (payload) => deleteTodo(payload),
    ...options,
  });
}
