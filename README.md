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

- store에서 사용할 수 있는 함수 4가지: `dispatch`, `getState`, `replaceReducer`, `subscribe`
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

**4. 액션 함수**

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

**4-1. 액션함수 리팩토링**

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

- 액션타입을 string 으로 작성해주고 있는데 일일이 문자를 작성해줄 경우 액션을 작성하는 과정에서 오타가 날 위험이 있기 대문에 string을 변수로 선언해준다.
- 이렇게 변수로 작성해주면 오타가 나더라도 자바스크립트에서 해당 변수가 없다고 오류를 출력해줄 수 있다. 반면에 문자열로만 작성할 경우에는 오타가 나더라도 오류를 찾기 힘들다.

```javascript
const ADD = "ADD";
const MINUS = "MINUS";
```

&nbsp;

## ✅ TODO LIST: Redux 적용

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
