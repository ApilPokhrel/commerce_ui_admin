import React from "react";
import PropTypes from "prop-types";
const Input = ({ name, label, type, id, value, placeholder, handleChange, multiple }) => {
  const [state, setState] = React.useState({
    err: false,
    errMsg: ""
  });

  const onFocus = () => {
    setState({ ...state, ["background"]: "#ddd" });
  };

  const onBlur = () => {
    setState({ ...state, ["background"]: "#f1f1f1" });
  };
  return (
    <div className="form-label-group">
      <input
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        type={type}
        id={id}
        className="form-control"
        value={value}
        name={name}
        multiple={multiple}
        placeholder={placeholder || ""}
        onChange={handleChange}
        required
      />
      <label htmlFor={id}>{label}</label>
      {state.err ? (
        <h3 style={{ color: "red" }}>{state.errMsg}</h3>
      ) : (
        <div className="noSpace"></div>
      )}
    </div>
  );
};
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default Input;
