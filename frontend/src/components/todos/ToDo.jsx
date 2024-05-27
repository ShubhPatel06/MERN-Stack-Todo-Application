import { FaPen, FaTrash } from "react-icons/fa";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoCompletionMutation,
} from "../../redux/api/todoApiSlice";
import moment from "moment";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ToDo = ({ todoId, setTodo }) => {
  const { todo } = useGetTodosQuery("todosList", {
    selectFromResult: ({ data }) => ({
      todo: data?.entities[todoId],
    }),
  });

  const [updateTodoCompletion, { isSuccess, isError, error }] =
    useUpdateTodoCompletionMutation();

  const [
    deleteTodo,
    { isSuccess: delSuccess, isError: delIsError, error: delError },
  ] = useDeleteTodoMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Todo status updated!");
    }

    if (delSuccess) {
      toast.success("Todo deleted!");
    }

    if (isError || delIsError) {
      toast.error(error?.data || delError?.data);
    }
  }, [isSuccess, delSuccess, isError, error, delIsError, delError]);

  const handleUpdateClick = () => {
    setTodo(todo);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleCheck = async (id) => {
    await updateTodoCompletion(id);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  if (todo) {
    return (
      <div className="flex items-start justify-between p-4 mb-3 border-2 rounded-sm">
        <div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={todo.isComplete}
              onChange={() => handleCheck(todo._id)}
            />
            <p
              className={`mb-1 text-lg md:text-2xl font-semibold ${
                todo.isComplete ? "line-through" : ""
              }`}
            >
              {todo.name}
            </p>
          </div>
          <span className="block mb-1 text-sm">Author: {todo.author}</span>
          <span className="block mb-1 text-sm">
            Added: {moment(todo.date).fromNow()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="p-2 bg-blue-600 rounded-sm hover:bg-blue-700"
            onClick={() => handleUpdateClick()}
          >
            <FaPen color="white" />
          </button>
          <button
            className="p-2 bg-red-600 rounded-sm hover:bg-red-700"
            onClick={() => handleDelete(todo._id)}
          >
            <FaTrash color="white" />
          </button>
        </div>
      </div>
    );
  }
};

export default ToDo;
