import { apiRequest, baseApi, T_ApiResponse } from "../base-api";

export type Trq_DeleteTodo = { id: number };
export async function deleteTodo(payload: Trq_DeleteTodo) {
  return apiRequest(
    baseApi.delete<T_ApiResponse<null>>(`/todos/${payload.id}`)
  );
}
export type T_ApiDeleteTodoResponse = Awaited<ReturnType<typeof deleteTodo>>;
