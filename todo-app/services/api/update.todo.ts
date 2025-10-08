import { apiRequest, baseApi, T_ApiResponse } from "../base-api";
import { T_Todo } from "./type.todos";

export type Trq_UpdateTodo = {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
};
export async function updateTodo(payload: Trq_UpdateTodo) {
  return apiRequest(
    baseApi.put<T_ApiResponse<T_Todo>>(`/todos/${payload.id}`, payload)
  );
}
export type T_ApiUpdateTodoResponse = Awaited<ReturnType<typeof updateTodo>>;
