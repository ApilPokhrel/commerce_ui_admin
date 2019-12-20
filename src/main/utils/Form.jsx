import React, { Component } from "react";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `.form-container {
  max-width: ${this.props.width};
  padding: 10px;
  background-color: white;
}
`
          }}
        ></style>
        <form
          method={this.props.method}
          onSubmit={this.props.handleSubmit}
          className="form-container form-signin"
        >
          {this.props.children}
        </form>
      </div>
    );
  }
}

export default Form;
