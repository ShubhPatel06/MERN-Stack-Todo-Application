import { useState } from "react";
import AddTodo from "./AddTodo";
import TodosList from "./TodosList";
import useAuth from "../../hooks/useAuth";

const ToDos = () => {
  const { name } = useAuth();
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
    author: name,
  });

  return (
    <main className="max-w-6xl mx-auto text-slate-700">
      <AddTodo todo={todo} setTodo={setTodo} />
      <TodosList setTodo={setTodo} />
    </main>
  );
};

export default ToDos;
