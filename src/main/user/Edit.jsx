import React, { Component } from "react";
import Form from "../utils/Form.jsx";
import Input from "../utils/Input.jsx";
import Select from "../utils/Select.jsx";
import Routes from "../common/Routes";
import Api from "../common/ApiService";
import Button from "../utils/Button.jsx";

class Edit extends Component {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const _id = params.get("user_id");
    this.state = {
      name: "",
      email: "",
      phone: "",
      country: "",
      _id,
      roles: [],
      gender: "",
      city: "",
      options: "",
      dob: new Date().toISOString().split("T")[0],
      rls: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await Api.init(Routes.user.patch.edit(this.state._id), this.state);
    alert("User Edited");
  }

  componentWillMount() {
    this.setUser();
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelect(event) {
    event.preventDefault();
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ [event.target.name]: value });
  }

  async generateOptions(r) {
    let roles = await this.getRoles();
    return roles.map((e, i) => {
      return (
        <option key={i} value={e._id}>
          {e.name}
        </option>
      );
    });
  }

  async getRoles() {
    let roles = await Api.init(Routes.role.get.search(), {});
    this.setState({ rls: roles.data });
    return roles.data;
  }

  setUser() {
    return Api.init(Routes.user.get.detail(this.state._id)).then(d => {
      let {
        data: { name, contact, roles, dob }
      } = d;
      let phone = contact[1] && contact[1].address ? contact[1].address : "";
      this.generateOptions(roles).then(opt => {
        let date = dob
          ? new Date(dob).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];
        this.setState({
          name: `${name.first} ${name.last}`,
          email: contact[0].address,
          phone: phone,
          roles: roles,
          dob: date,
          options: opt
        });
        return roles;
      });
    });
  }

  render() {
    let state = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">{`Edit User`}</h5>
                <Form method="POST" handleSubmit={this.handleSubmit}>
                  <Input
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Name..."
                    name="name"
                    value={state.name}
                    handleChange={this.handleChange}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="text"
                    placeholder="Email..."
                    name="email"
                    value={state.email}
                    handleChange={this.handleChange}
                  />

                  <Input
                    id="phone"
                    label="Phone"
                    type="text"
                    placeholder="Phone..."
                    name="phone"
                    value={state.phone}
                    handleChange={this.handleChange}
                  />

                  <Input
                    id="dob"
                    label="Date Of Birth"
                    type="date"
                    placeholder="Date Of Birth.."
                    name="dob"
                    value={state.dob}
                    handleChange={this.handleChange}
                  />

                  <Select
                    id="u-roles"
                    label="Roles"
                    multiple={true}
                    name="roles"
                    defaultValue={state.roles}
                    options={state.options}
                    value={state.roles}
                    handleChange={this.handleSelect}
                  >
                    {state.options}
                  </Select>
                  <hr />
                  <Button label="Submit" type="submit" />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
