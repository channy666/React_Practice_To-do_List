import { useState } from "react";

export default function useFilter() {
  const [filter, setFilter] = useState("all");

  const handleFilterClick = (filter) => {
    if (filter !== "all" && filter !== "completed" && filter !== "uncompleted")
      return;
    setFilter(filter);
  };

  const filterTodos = (todos) => {
    switch (filter) {
      case "all":
        return todos;
      case "uncompleted":
        return todos.filter((todo) => !todo.isCompleted);
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      // no default
    }
  };

  return {
    filter,
    handleFilterClick,
    filterTodos,
  };
}
