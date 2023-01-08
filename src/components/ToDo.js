import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

const ToDo = ({ text, onBtnClick }) => {
  return (
    <li>
      {JSON.stringify(text)} <button onClick={onBtnClick}>삭제</button>
    </li>
  );
};

// mapDispatchToProps()
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(ToDo);
