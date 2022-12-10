# Vanilla Redux

## Redux 를 사용하는 이유
```javascript
const add = document.getElmentById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;

const updateText = () => {
    number.innerText = count;
}

const handleAdd = () => {
    count += 1;
    updateText();
}

const handleMinus = ()=> {
    count -= 1;
    updateText();
}

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
  return "hello"
}

// store
const countStore = createStore(countModifier);

console.log(countStore.getState()); // hello
```
**3. reducer 함수에게 액션 전달** :
- store에서 dispatch하면 action을 store에 연결된 reducer 함수에게 전달해준다.
```javascript
// reducer
const countModifier = (count = 0, action) => {
  console.log(action); // { type: "HELLO" }
  return count;
}

// store
const countStore = createStore(countModifier);

countStore.dispatch({ type: "HELLO "});
```
**4. 액션 함수**
- dispatch로부터 action을 전달받으면 해당 액션에서 실행될 함수를 작성해준다.
```javascript
// reducer
const countModifier = (count = 0, action) => {
  if (action.type === 'ADD') {
    return count + 1;
  } else if (action.type === 'MINUS') {
    return count - 1;
  } else {
    return count;
  }
}

// store
const countStore = createStore(countModifier);

countStore.dispatch({ type: "ADD "});
```