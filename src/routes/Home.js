import React, { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    setText("");
  };

  return (
    <>
      <h1>To DO</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  );
};

export default Home;
