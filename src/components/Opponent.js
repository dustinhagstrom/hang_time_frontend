import React from "react";

function Opponent(props) {
  const { opponent } = props;

  return <div>{opponent ? opponent : ""}</div>;
}

export default Opponent;
