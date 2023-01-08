# Vanilla Redux

## Redux 를 사용하는 이유

```javascript
const add = document.getElmentById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;

const updateText = () => {
  number.innerText = count;
};

const handleAdd = () => {
  count += 1;
  updateText();
};

const handleMinus = () => {
  count -= 1;
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
```

이와 같이 카운터 예제가 있을 때, 기존 JavaScript에서는 HTML에게 `count` 값이 바뀌었다고 알려주기 위해 함수를 실행시켜주어야 했다.

&nbsp;

## Redux 시작

```bash
yarn add redux
```

&nbsp;

## Redux 사용법

**1. store 생성** : 상태 데이터를 넣어둘 저장소인 store를 생성한다.

- store에서 사용할 수 있는 함수 4가지: `dispatch`, `getState`, `replaceReducer`, `subscribe` (\*[store methods 공식문서](https://ko.redux.js.org/api/store))
- `dispatch`: action을 store에 연결된 reducer 함수에게 전달해준다.
- `subscribe`: store 안에 있는 변화들을 알게 해준다.
- `getState`: store에 저장되어 있는 상태값을 가져온다.

```javascript
import { createStore } from "redux";

const countStore = createStore();
```

**2. reducer 작성** :

- 관리해줄 상태 데이터값을 변경해줄 reducer 함수를 작성한다.
- reducer 함수에서 <U>return 하는 값은 곧 상태 데이터의 값</U>이 된다.

```javascript
// reducer
const countModifier = () => {
  return "hello";
};

// store
const countStore = createStore(countModifier);

console.log(countStore.getState()); // hello
```

**3. reducer 함수에게 액션 전달** :

- store에서 dispatch하면 action을 store에 연결된 reducer 함수에게 전달해준다.
- 이때 action은 object 형태여야 하며, type이 있어야 한다.

```javascript
// reducer
const countModifier = (count = 0, action) => {
  console.log(action); // { type: "HELLO" }
  return count;
};

// store
const countStore = createStore(countModifier);

countStore.dispatch({ type: "HELLO " });
```

**4. Reducer**

- dispatch로부터 action을 전달받으면 해당 액션에서 실행될 함수를 작성해준다.

```javascript
// reducer
const countModifier = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};

// store
const countStore = createStore(countModifier);

countStore.dispatch({ type: "ADD " });
```

**4-1. Reducer 리팩토링**

1. switch 문

- 액션 타입이 많아지게 되면 if문으로 일일이 작성해주어야 하는 것이 늘어나게 될 것이다.
- 그래서 이용하는 것이 `switch` 문을 이용하는 것이다.

```javascript
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case "ADD":
      return count + 1;
    case "MINUS":
      return count - 1;
    default:
      return count;
  }
};
```

2. 액션타입 string 변수 선언

- 액션타입을 string 으로 작성해주고 있는데 일일이 문자를 작성해줄 경우 액션을 작성하는 과정에서 오타가 날 위험이 있기 때문에 string을 변수로 선언해준다.
- 이렇게 변수로 작성해주면 오타가 나더라도 자바스크립트에서 해당 변수가 없다고 오류를 출력해줄 수 있다. 반면에 문자열로만 작성할 경우에는 오타가 나더라도 오류를 찾기 힘들다.

```javascript
const ADD = "ADD";
const MINUS = "MINUS";
```

&nbsp;

## TODO LIST: Redux 적용

`action` 을 보내줄 때 `store.dispatch()` 를 통해서 액션타입을 넘겨줄 수 있었다.

그리고 `store` 에 연결되어있던 reducer는 넘겨받은 액션타입에 해당하는 함수를 실행시킨다.

이 때, 다음과 같이 액션타입 이외에도 <U>변수</U>를 넘겨줄 수도 있다.

```javascript
// reducer
const reducer = (state = [], action) => {
  console.log(action.text); // toDo 값이 출력된다.
};

// store
const store = createStore(reducer);

const onSubmit = (e) => {
  const toDo = input.value;
  store.dispatch({ type: ADD_TODO, text: toDo });
};
```

그리고 dispatch 할 때 타입명을 직접적으로 넘겨주기 보다 함수에 return 시켜서 함수로 전달해주기도 한다.

```javascript
const addTodo = (text) => {
  // reducer에게 전달해줄 액션타입과 변수가 담긴 함수
  return {
    type: ADD_TODO,
    text,
  };
};

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text)); // 함수로 전달
  paintTodos();
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo); // 액션 디스패치
};
```

### ⚠️ Redux 사용 시 주의점

- mutate state 하지 않을 것. 대신 new state objects를 리턴할 것.
- 즉, 다이렉트로 state 값을 수정해서는 안된다.
- 기존의 상태값을 복사해서 새로운 객체를 리턴해야 한다.

&nbsp;

# React Redux

## React Redux 시작

```bash
yarn add react-redux react-router-dom
```

&nbsp;

## React Router 적용

React Router v6.4 부터는 다음과 같이 적용해야 한다.

```javascript
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
```

&nbsp;

## Store 만들기

```javascript
import { createStore } from "redux";

// 액션타입 선언
const ADD = "ADD";
const DELETE = "DELETE";

// 액션 생성 함수
export const addTodo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

// reducer
const reducer = (state = [], action) => {
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

export default store;
```

상태값을 관리할 Store와 액션/함수들을 설정해주고나면 이를 React 에 적용시키기 위해서는 다음과 같은 과정이 필요하다.

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

이렇게 `react-redux` 로부터 `Provider`를 불러와서 `store`를 주입시켜주고 store에서 관리하고 있는 상태값을 구독할 컴포넌트를 Provider로 감싸주면 된다.

&nbsp;

## Store 데이터 가져오기

이제 이 store의 상태값을 컴포넌트에서 읽어 오려면 다음과 같이 가져올 수 있다.

### 1. connect() - `mapStateToProps(state, ownProps)`

📄 [공식문서](https://react-redux.js.org/api/connect)

- `mapStateToProp()` 함수에서 첫번째 인자의 state는 store에서 읽어오고, 두번째 인자의 ownProps는 해당 컴포넌트에서 `props`로 넘겨 받은 값을 조회할 수 있다.
- 그리고 `mapStateToProps()` 에서 return 한 값은 해당 컴포넌트와 연결되어 있으므로 컴포넌트의 `prop`에서 조회할 수 있다.
- 공식문서에서 보면 state 값을 불러오는 <U>function의 이름은 `mapStateToProps` 여야 한다</U>고 한다.

```javascript
// Home.js
import { connect } from "react-redux";

const Home = ({ toDos }) => {
 return {
   <ul>{JSON.stringify(toDos)}</ul>
 }
};

// mapStateToProps(state, ownProps)
const mapStateToProps = (state) => {
  return {
    toDos: state,
  };
};

export default connect(mapStateToProps)(Home);
```

&nbsp;

### 2. Using Hooks - `useSelector()`

📄 [공식문서](https://react-redux.js.org/api/hooks)

`connect()`에서 state 값을 불러왔듯, 이 hook을 이용해서 동일하게 store 의 상태값을 읽어올 수 있다.

```javascript
import React from "react";
import { useSelector } from "react-redux";

export const CounterComponent = () => {
  const counter = useSelector((state) => state.counter);
  return <div>{counter}</div>;
};
```

&nbsp;

## Store 데이터 패치하기

### 1. connect() - `mapDispatchToProps(state, ownProps)`

데이터를 가져올 때와 비슷하게 connect() 함수에 데이터를 패치할 mapDispatchToProps 를 연결시켜준 뒤, 해당 함수에서 return 한 값을 props 로 조회할 수 있다.

```javascript
// Home.js
import { connect } from "react-redux";

const Home = ({ toDos, addTodo }) => {

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  }

 return {
   <ul>{JSON.stringify(toDos)}</ul>
 }
};

// mapStateToProps(state, ownProps)
const mapStateToProps = (state) => {
  return {
    toDos: state,
  };
};

// mapDispatchToProps()
const mapDispatchToProps(dispatch) {
  return {addTodo: (text) => dispatch(actionCreators.addTodo(text))};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

&nbsp;

### 2. using Hooks - `useDispatch()`

앞에서 `store.dispatch()`로 reducer에게 action 타입을 넘겨주었듯이, 이 hook을 사용하여 동일하게 기능할 수 있다.

```javascript
import React from "react";
import { useDispatch } from "react-redux";

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: "increment-counter" })}>
        Increment counter
      </button>
    </div>
  );
};
```
