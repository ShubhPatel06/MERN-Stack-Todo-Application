import { useGetTodosQuery } from "../../redux/api/todoApiSlice";
import ToDo from "./ToDo";
import PulseLoader from "react-spinners/PulseLoader";

const TodosList = ({ setTodo }) => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery("todosList");

  if (isLoading) return <PulseLoader />;

  if (isError) {
    return <p>{error?.data}</p>;
  }

  if (isSuccess) {
    const { ids } = todos;

    return (
      <div className="p-6 m-4 border-2 rounded-sm shadow-md">
        <h2 className="mb-3 text-2xl font-semibold">
          {ids.length > 0 ? "My Todos" : "No todos added yet"}
        </h2>
        {ids?.length > 0 &&
          ids?.map((todoId) => (
            <ToDo key={todoId} todoId={todoId} setTodo={setTodo} />
          ))}
      </div>
    );
  }
};

export default TodosList;
