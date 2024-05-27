import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const todosAdapter = createEntityAdapter({});

const initialState = todosAdapter.getInitialState();

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTodos = responseData.map((todo) => {
          todo.id = todo._id;
          return todo;
        });
        return todosAdapter.setAll(initialState, loadedTodos);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Todo", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Todo", id })),
          ];
        } else return [{ type: "Todo", id: "LIST" }];
      },
    }),
    addNewTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: {
          ...newTodo,
        },
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    updateTodo: builder.mutation({
      query(data) {
        const { updatedTodo, id } = data;
        return {
          url: `/todos/${id}`,
          method: "PUT",
          body: {
            ...updatedTodo,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
    updateTodoCompletion: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoCompletionMutation,
  useDeleteTodoMutation,
} = todoApiSlice;

// returns the query result object
export const selectTodosResult = todoApiSlice.endpoints.getTodos.select();

// creates memoized selector
const selectTodosData = createSelector(
  selectTodosResult,
  (todosResult) => todosResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
  // Pass in a selector that returns the todos slice of state
} = todosAdapter.getSelectors(
  (state) => selectTodosData(state) ?? initialState
);
