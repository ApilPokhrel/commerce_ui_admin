import React, { Component } from "react";

const Button = ({ name, label, type, id, value, handleChange, style }) => {
  const [state, setState] = React.useState({});
  const onMouseEnter = () => {
    setState({ ...state, ["opacity"]: "1" });
  };
  const onMouseLeave = () => {
    setState({ ...state, ["opacity"]: "0.8" });
  };

  return (
    <button
      style={style || {}}
      type={type}
      name={name}
      className="btn btn-primary btn-block "
      onClick={handleChange}
      value={value}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={id}
    >
      {label}
    </button>
  );
};
export default Button;
