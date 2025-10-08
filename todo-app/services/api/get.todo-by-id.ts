import { apiRequest, baseApi, T_ApiResponse } from "../base-api";
import { T_Todo } from "./type.todos";

export type Trq_GetTodoById = { id: number };
export async function getTodoById(payload: Trq_GetTodoById) {
  return apiRequest(baseApi.get<T_ApiResponse<T_Todo>>(`/todos/${payload.id}`));
}
export type T_ApiGetTodoByIdResponse = Awaited<ReturnType<typeof getTodoById>>;
