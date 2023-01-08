import { createStore } from "redux";

// 액션타입 선언
const ADD = "ADD";
const DELETE = "DELETE";

// 액션 생성 함수
const addTodo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

// reducer
const reducer = (state = ["hello"], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

// store
const store = createStore(reducer);

export const actionCreators = {
  addTodo,
  deleteTodo,
};

export default store;
