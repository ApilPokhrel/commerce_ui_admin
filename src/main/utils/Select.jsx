import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "100%",
      padding: "15px",
      margin: "5px 0 22px 0",
      border: "none",
      background: "#f1f1f1",
      outline: "none"
    };
  }
  onFocus() {
    this.setState({ background: "#ddd" });
  }

  onBlur() {
    this.setState({ background: "#f1f1f1" });
  }

  render() {
    let { label, multiple, name, id, handleChange, defaultValue } = this.props;
    return (
      <div className="form-group">
        <select
          name={name}
          className="form-control"
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          id={id}
          value={defaultValue}
          multiple={multiple}
          onChange={handleChange}
        >
          {this.props.children}
        </select>
        <label
          style={{ marginLeft: "25px", fontSize: "12px", color: "#777", fontWeight: "bold" }}
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    );
  }
}

export default Select;
