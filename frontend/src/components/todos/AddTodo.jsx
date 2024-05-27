import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  useAddNewTodoMutation,
  useUpdateTodoMutation,
} from "../../redux/api/todoApiSlice";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const AddTodo = ({ todo, setTodo }) => {
  const { name } = useAuth();

  const [addNewTodo, { isLoading, isSuccess: addSuccess, isError, error }] =
    useAddNewTodoMutation();

  const [
    updateTodo,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateHasError,
      error: updateError,
    },
  ] = useUpdateTodoMutation();

  useEffect(() => {
    if (addSuccess) {
      toast.success("Todo Added!");
      setTodo({
        name: "",
        isComplete: false,
        author: name,
      });
    }
  }, [addSuccess, setTodo, name]);

  useEffect(() => {
    if (updateIsSuccess) {
      toast.success("Todo Updated!");
      setTodo({
        name: "",
        isComplete: false,
        author: name,
      });
    }
  }, [updateIsSuccess, setTodo, name]);

  useEffect(() => {
    if (isError || updateHasError) {
      const errorMessage = error?.data || updateError?.data;

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  }, [isError, updateHasError, error, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author: name,
      };
      await updateTodo({ updatedTodo, id });
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      await addNewTodo(newTodo);
    }
  };

  return (
    <div className="p-6 m-4 border-2 rounded-sm shadow-md">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-2 border-2 rounded-md border-slate-600"
          placeholder="Enter a ToDo"
          autoFocus
          value={todo.name}
          onChange={(e) =>
            setTodo({
              ...todo,
              name: e.target.value,
            })
          }
        />
        <button
          type="submit"
          disabled={isLoading || updateIsLoading}
          className="px-4 py-3 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <FaPlus color="white" size={18} />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
