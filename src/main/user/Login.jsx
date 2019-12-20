import React, { Component } from "react";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import Button from "../utils/Button.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Snackbar from "../utils/Snackbar.jsx";
import { Link } from "react-router-dom";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let {
        data: { accessToken, refreshToken }
      } = await Api.init(Routes.user.post.login(), this.state);
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      window.location.href = "/";
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <Snackbar ref={snackbar => (this.snackbar = snackbar)} />
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">{this.props.title || ""}</h5>

                <Form method="POST" handleSubmit={this.handleSubmit} title="Sign In">
                  <Input
                    id="email"
                    label="Email"
                    type="text"
                    placeholder="Email..."
                    name="email"
                    value={email}
                    handleChange={this.handleChange}
                  />

                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    handleChange={this.handleChange}
                  />

                  <hr />
                  <Button label="Submit" type="submit" />
                  <div className="text-center">
                    <Link className="small" to="/register">
                      New ! Register Here...
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
