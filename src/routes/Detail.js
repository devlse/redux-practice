import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  return (
    <>
      <div>Detail </div>
      <b>{params.id}</b>
    </>
  );
};

export default Detail;
