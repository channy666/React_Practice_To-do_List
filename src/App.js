import styled from "styled-components";
import TodoItem from "./component/TodoItem";
import useTodos from "./hook/useTodos";
import useFilter from "./hook/useFilter";
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "./breakpoints";

const Root = styled.div`
  width: 992px;
  margin: 0 auto;
  margin-bottom: 50px;

  ${MEDIA_QUERY_LG} {
    width: 768px;
  }

  ${MEDIA_QUERY_MD} {
    width: 576px;
  }

  ${MEDIA_QUERY_SM} {
    width: 360px;
  }
`;

const Title = styled.div`
  font-size: 48px;
  color: IndianRed;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;

  ${MEDIA_QUERY_MD} {
    font-size: 40px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 35px;
  }
`;

const AddTodo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 30px 30px 30px;
  flex-wrap: wrap;
  align-items: center;

  ${MEDIA_QUERY_MD} {
    margin: 30px 30px 25px 30px;
  }

  ${MEDIA_QUERY_SM} {
    margin: 25px 15px;
  }
`;

const TodoInput = styled.input`
  width: 75%;
  margin-left: 30px;
  font-size: 18px;
  letter-spacing: 1px;
  height: 35px;

  ${MEDIA_QUERY_LG} {
    margin-left: 35px;
    font-size: 17px;
    width: 72%;
    height: 32px;
  }

  ${MEDIA_QUERY_MD} {
    margin-left: 35px;
    width: 65%;
  }

  ${MEDIA_QUERY_SM} {
    margin-left: 15px;
    width: 66%;
    height: 30px;
    font-size: 16px;
  }

  ::placeholder {
    color: Silver;
  }
`;

const TodoSubmitButton = styled.button`
  text-decoration: none;
  font-size: 18px;
  letter-spacing: 6px;
  justify-content: center;
  text-align: center;
  width: 12%;
  color: DarkOliveGreen;
  border: none;
  background: Whitesmoke;
  border-radius: 5px;
  height: 45px;
  cursor: pointer;
  margin-right: 20px;
  padding-left: 14px;

  ${MEDIA_QUERY_LG} {
    width: 15%;
    margin-right: 25px;
    font-size: 17px;
    height: 40px;
  }

  ${MEDIA_QUERY_MD} {
    width: 16%;
    font-size: 16px;
  }

  ${MEDIA_QUERY_SM} {
    width: 21%;
    margin-right: 0px;
    font-size: 15px;
    letter-spacing: 3px;
    height: 35px;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  :hover {
    background: DarkOliveGreen;
    color: Whitesmoke;
    font-weight: bold;
  }
`;

const Filter = styled.div`
  display: flex;
  margin: 40px 0px 20px 60px;

  ${MEDIA_QUERY_LG} {
    margin-top: 35px;
  }

  ${MEDIA_QUERY_SM} {
    margin: 20px;
    justify-content: space-around;
  }
`;

const AllTodos = styled.button`
  color: IndianRed;
  background: none;
  border: none;
  margin-right: 20px;
  font-size: 16px;
  height: 50px;
  width: 80px;
  border-radius: 5px;
  letter-spacing: 3px;
  cursor: pointer;
  font-weight: bold;
  padding-left: 10px;

  ${MEDIA_QUERY_LG} {
    margin-right: 20px;
    height: 43px;
    width: 75px;
  }

  ${MEDIA_QUERY_MD} {
    margin-right: 15px;
    height: 40px;
    width: 70px;
    letter-spacing: 2px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 14px;
    margin: 0px;
    height: 35px;
    width: 73px;
    letter-spacing: normal;
    padding: 0px;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  :hover {
    background: DarkOliveGreen;
    color: White;
  }

  ${(props) =>
    props.$active &&
    `
    background: DarkOliveGreen;
    color: white;
  `}
`;

const UncompletedTodos = styled(AllTodos)`
  color: DarkSeaGreen;

  :hover {
    color: white;
    background: DarkSeaGreen;
  }

  ${(props) =>
    props.$active &&
    `
    color: white;
    background: DarkSeaGreen;
  `}
`;

const CompletedTodos = styled(UncompletedTodos)`
  color: DimGray;

  :hover {
    background: DimGray;
  }

  ${(props) =>
    props.$active &&
    `
    background: DimGray;
    color: white;
  `}
`;

const ClearAllTodos = styled(UncompletedTodos)`
  color: LightCoral;

  :hover {
    background: LightCoral;
  }
`;

const TodoContainer = styled.div`
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  color: LightCoral;
  margin-left: 30px;
  margin-top: 10px;
  font-size: 17px;

  ${MEDIA_QUERY_LG} {
    font-size: 16px;
    margin-left: 35px;
  }

  ${MEDIA_QUERY_SM} {
    margin-left: 15px;
    font-size: 15px;
  }
`;

function App() {
  const {
    todos,
    handleAddTodo,
    todoInput,
    errorMessage,
    handleInputChange,
    handleInputFocus,
    handleToggleIsCompleted,
    handleDeleteTodo,
    handleFinishEditTodo,
    editingTodo,
    handleEditTodo,
    editTodoInput,
    handleEditTodoInputChange,
    handleDeleteAllTodos,
  } = useTodos();
  const { filter, handleFilterClick, filterTodos } = useFilter();

  return (
    <Root>
      <Title>- To-do List -</Title>
      <AddTodo>
        <TodoInput
          onChange={handleInputChange}
          placeholder="To-do"
          value={todoInput}
          onFocus={handleInputFocus}
          onKeyPress={handleAddTodo}
        />
        <TodoSubmitButton onClick={handleAddTodo}>新增</TodoSubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </AddTodo>
      <Filter>
        <AllTodos
          $active={filter === "all"}
          onClick={() => handleFilterClick("all")}
        >
          全部
        </AllTodos>
        <UncompletedTodos
          $active={filter === "uncompleted"}
          onClick={() => handleFilterClick("uncompleted")}
        >
          未完成
        </UncompletedTodos>
        <CompletedTodos
          $active={filter === "completed"}
          onClick={() => handleFilterClick("completed")}
        >
          已完成
        </CompletedTodos>
        <ClearAllTodos onClick={handleDeleteAllTodos}>清空</ClearAllTodos>
      </Filter>
      <TodoContainer>
        {filterTodos(todos).map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              handleToggleIsCompleted={handleToggleIsCompleted}
              handleDeleteTodo={handleDeleteTodo}
              handleFinishEditTodo={handleFinishEditTodo}
              isEditing={editingTodo === todo.id}
              handleEditTodo={handleEditTodo}
              editTodoInput={editingTodo === todo.id ? editTodoInput : ""}
              handleEditTodoInputChange={handleEditTodoInputChange}
            />
          );
        })}
      </TodoContainer>
    </Root>
  );
}

export default App;
