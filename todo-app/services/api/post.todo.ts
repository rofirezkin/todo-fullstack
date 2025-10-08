import { apiRequest, baseApi, T_ApiResponse } from "../base-api";
import { T_Todo } from "./type.todos";

export type Trq_CreateTodo = {
  title: string;
  description?: string;
};
export async function createTodo(payload: Trq_CreateTodo) {
  return apiRequest(baseApi.post<T_ApiResponse<T_Todo>>("/todos", payload));
}
export type T_ApiCreateTodoResponse = Awaited<ReturnType<typeof createTodo>>;
