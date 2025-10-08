import {
  createTodo,
  T_ApiCreateTodoResponse,
  Trq_CreateTodo,
} from "@/services/api/post.todo";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreateTodo = {
  options?: Partial<
    MutationOptions<T_ApiCreateTodoResponse, T_AxiosBaseError, Trq_CreateTodo>
  >;
};

export function useCreateTodo({ options }: T_UseCreateTodo = {}) {
  return useMutation({
    mutationFn: (payload) => createTodo(payload),
    ...options,
  });
}
