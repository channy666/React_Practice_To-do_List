import { useState, useRef, useCallback } from "react";
import useInput from "./useInput";

export default function useTodos() {
  const {
    todoInput,
    setTodoInput,
    setEditingTodo,
    setEditTodoInput,
    setErrorMessage,
    errorMessage,
    editingTodo,
    editTodoInput,
    handleInputChange,
    handleInputFocus,
    handleEditTodo,
    handleEditTodoInputChange,
  } = useInput();
  const [todos, setTodos] = useState([]);
  const id = useRef(1);

  const handleAddTodo = useCallback(
    (e) => {
      if (e.key && e.key !== "Enter") return;

      if (!todoInput) {
        return setErrorMessage("請輸入待辦事項！");
      }

      setTodos([
        ...todos,
        {
          id: id.current,
          content: todoInput,
          isCompleted: false,
        },
      ]);

      id.current++;
      setTodoInput("");
      setErrorMessage(null);
    },
    [todoInput, todos]
  );

  const handleFinishEditTodo = useCallback(
    (e) => {
      if (e.key && e.key !== "Enter") return;

      if (!editingTodo || !editTodoInput) return;

      setTodos(
        todos.map((todo) => {
          if (todo.id === editingTodo) {
            return {
              ...todo,
              content: editTodoInput,
            };
          }
          return todo;
        })
      );
      setEditingTodo(0);
      setEditTodoInput(null);
    },
    [todos, editingTodo, editTodoInput]
  );

  const handleToggleIsCompleted = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          }
          return todo;
        })
      );
    },
    [todos]
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleDeleteAllTodos = useCallback(() => {
    setTodos([]);
  }, []);

  return {
    todos,
    todoInput,
    setTodos,
    handleAddTodo,
    handleFinishEditTodo,
    handleToggleIsCompleted,
    handleDeleteTodo,
    errorMessage,
    editingTodo,
    editTodoInput,
    handleInputChange,
    handleInputFocus,
    handleEditTodo,
    handleEditTodoInputChange,
    handleDeleteAllTodos,
  };
}
