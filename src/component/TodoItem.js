import { memo, useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MEDIA_QUERY_LG, MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../breakpoints";

const Todo = styled.div`
  width: 88%;
  margin: 0 auto;
  border: 2px dashed DarkSeaGreen;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: Whitesmoke;
  border-radius: 5px;
  height: 60px;

  ${MEDIA_QUERY_LG} {
    width: 85%;
    height: 53px;
  }

  ${MEDIA_QUERY_MD} {
    height: 48px;
    width: 87%;
  }

  ${MEDIA_QUERY_SM} {
    height: 45px;
  }

  & + & {
    margin-top: 15px;
  }

  ${(props) =>
    props.$isCompleted &&
    `
    background: Silver;
    border-color: DimGray;
  `}
`;

const TodoContent = styled.div`
  font-size: 20px;
  color: DarkOliveGreen;
  letter-spacing: 1.5px;
  margin-left: 20px;
  overflow: scroll;
  white-space: nowrap;
  margin-right: 15px;

  ${MEDIA_QUERY_LG} {
    font-size: 19px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
    margin-left: 17px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 17px;
    margin-left: 12px;
  }

  ${(props) =>
    props.$isCompleted &&
    `
    text-decoration: line-through;
  `}
`;

const EditTodoContent = styled.input`
  font-size: 20px;
  color: DarkOliveGreen;
  letter-spacing: 1.5px;
  margin-left: 20px;
  width: 65%;
  height: 28px;

  ${MEDIA_QUERY_LG} {
    font-size: 19px;
    width: 58%;
    margin-left: 17px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
    width: 48%;
    margin-left: 13px;
  }

  ${MEDIA_QUERY_SM} {
    width: 70%;
  }
`;

const TodoButtons = styled.div`
  display: flex;

  ${MEDIA_QUERY_SM} {
    position: relative;
  }
`;

const TodoButton = styled.button`
  text-decoration: none;
  background: none;
  color: whitesmoke;
  border-radius: 5px;
  background: DarkSeaGreen;
  height: 40px;
  margin-right: 15px;
  width: 70px;
  letter-spacing: 1.5px;
  padding-left: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  z-index: 4;

  :hover {
    color: DarkSlateGray;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 15px;
    height: 35px;
    margin-right: 12px;
    width: 65px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 14px;
    height: 31px;
    margin-right: 10px;
    width: 60px;
    letter-spacing: 1px;
  }

  ${MEDIA_QUERY_SM} {
    position: absolute;
    font-size: 12px;
    height: 30px;
    width: 60px;
    right: -10px;
    top: 9px;
    letter-spacing: normal;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) =>
      !props.$show &&
      `
      display: none;
    `}
  }

  ${(props) =>
    props.$isCompleted &&
    `
    background: DimGray;

    :hover {
      color: DarkSeaGreen;
    }
  `}
`;

const RedTodoButton = styled(TodoButton)`
  background: LightCoral;
  letter-spacing: 5px;
  padding-left: 12px;

  :hover {
    color: Maroon;
  }

  ${MEDIA_QUERY_SM} {
    top: 41px;
    padding: 0px;
    letter-spacing: normal;
  }
`;

const EditTodoButton = styled(RedTodoButton)`
  background: Tan;

  :hover {
    color: Chocolate;
  }

  ${MEDIA_QUERY_SM} {
    top: -23px;
  }
`;

const FinishEditTodoButton = styled(EditTodoButton)`
  background: DarkKhaki;

  :hover {
    color: DimGray;
  }
`;

const HamburgerIcon = styled.div`
  height: 45px;
  width: 45px;
  background: transparent;
  align-items: center;
  display: none;

  ${MEDIA_QUERY_SM} {
    display: flex;
  }
`;

const HamburgerIconLine = styled.div`
  background: DarkOliveGreen;
  height: 3px;
  width: 25px;
  margin: 0px 10px;
  border-radius: 5px;
  position: relative;
  z-index: 3;
  flex-shrink: 0;

  ::before {
    content: "";
    background: DarkOliveGreen;
    height: 3px;
    width: 25px;
    border-radius: 5px;
    position: absolute;
    top: -10px;

    ${(props) =>
      props.$hover &&
      `
      background: DarkSeaGreen;
    `}
  }

  ::after {
    content: "";
    background: DarkOliveGreen;
    height: 3px;
    width: 25px;
    border-radius: 5px;
    position: absolute;
    top: 10px;

    ${(props) =>
      props.$hover &&
      `
      background: DarkSeaGreen;
    `}
  }

  ${(props) =>
    props.$hover &&
    `
    background: DarkSeaGreen;
  `}
`;

function TodoItem({
  todo,
  handleToggleIsCompleted,
  handleDeleteTodo,
  handleFinishEditTodo,
  isEditing,
  handleEditTodo,
  editTodoInput,
  handleEditTodoInputChange,
}) {
  const { id, content, isCompleted } = todo;
  const editTodoInputRef = useRef();
  const [showTodoButtons, setShowTodoButtons] = useState(false);

  useEffect(() => {
    if (isEditing) editTodoInputRef.current.focus();
  }, [isEditing]);

  const handleMouseEnterTodoButtons = useCallback(() => {
    setShowTodoButtons(true);
  }, []);

  const handleMouseLeaveTodoButtons = useCallback(() => {
    setShowTodoButtons(false);
  }, []);

  return (
    <Todo $isCompleted={isCompleted}>
      {!isEditing && (
        <TodoContent $isCompleted={isCompleted}>{content}</TodoContent>
      )}
      {isEditing && (
        <EditTodoContent
          value={editTodoInput}
          onChange={handleEditTodoInputChange}
          placeholder="請輸入代辦事項"
          ref={editTodoInputRef}
          onKeyDown={handleFinishEditTodo}
        />
      )}
      <TodoButtons
        onMouseEnter={handleMouseEnterTodoButtons}
        onMouseLeave={handleMouseLeaveTodoButtons}
      >
        <HamburgerIcon>
          <HamburgerIconLine $hover={showTodoButtons} />
        </HamburgerIcon>
        {!isEditing && (
          <EditTodoButton
            onClick={() => {
              handleEditTodo(id, content);
            }}
            $show={showTodoButtons}
          >
            編輯
          </EditTodoButton>
        )}
        {isEditing && (
          <FinishEditTodoButton
            onClick={handleFinishEditTodo}
            $show={showTodoButtons}
          >
            修改
          </FinishEditTodoButton>
        )}
        <TodoButton
          $isCompleted={isCompleted}
          $show={showTodoButtons}
          onClick={() => {
            handleToggleIsCompleted(id);
          }}
        >
          {isCompleted ? "未完成" : "已完成"}
        </TodoButton>
        <RedTodoButton
          onClick={() => handleDeleteTodo(id)}
          $show={showTodoButtons}
        >
          刪除
        </RedTodoButton>
      </TodoButtons>
    </Todo>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isCompleted: PropTypes.bool,
  }),
  editTodoInput: PropTypes.string,
  isEditing: PropTypes.bool,
  handleToggleIsCompleted: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleEditTodo: PropTypes.func,
  handleEditTodoInputChange: PropTypes.func,
  handleFinishEditTodo: PropTypes.func,
};

export default memo(TodoItem);
