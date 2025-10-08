import { apiRequest, baseApi, T_ApiResponse } from "../base-api";
import { T_Todo } from "./type.todos";

export async function getTodos() {
  return apiRequest(baseApi.get<T_ApiResponse<T_Todo[]>>("/todos"));
}
export type T_ApiGetTodosResponse = Awaited<ReturnType<typeof getTodos>>;
