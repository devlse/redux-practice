import { createStore } from "redux";

const add = document.getElementById('add');
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;
const ADD = "ADD";
const MINUS = "MINUS";

// reducer
const countModifier = (count = 0, action) => {
 switch (action.type) {
  case ADD:
    return count + 1;
  case MINUS:
    return count - 1;
  default:
    return count;
 }
}

// store
const countStore = createStore(countModifier);

// Action functions
const onChange = () => {
  number.innerText = countStore.getState();
}

const handleAdd =  () => {
  countStore.dispatch({ type: ADD})
}
const handleMinus =  () => {
  countStore.dispatch({ type: MINUS})
}

countStore.subscribe(onChange)
add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);