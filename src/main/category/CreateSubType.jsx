import React from "react";
import Snackbar from "../utils/Snackbar.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Button from "../utils/Button.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import Select from "../utils/Select.jsx";

class SubTypeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      status: "",
      score: 0,
      category: "",
      categories: [],
      types: [],
      categories_option: [],
      types_option: [],
      type: "",
      conatiner: "first"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async componentDidMount() {
    let {
      data: { data }
    } = await Api.init(Routes.category.get.list2(100, 0), {});
    if (data.length) {
      let copt = await this.generateCategoryOptions(data);
      this.setState({ categories_option: copt, categories: data, category: data[0]._id });

      Api.init(Routes.type.get.byCategory(data[0]._id)).then(d => {
        let types = d.data;
        if (types.length) {
          let topt = this.generateCategoryOptions(types);
          this.setState({ type: types[0]._id, types, types_option: topt });
        }
      });
    }
  }

  generateCategoryOptions(c) {
    if (c) {
      return c.map((e, i) => {
        return (
          <option key={i} value={e._id}>
            {e.name}
          </option>
        );
      });
    } else {
      return [];
    }
  }

  handleSelect(event) {
    event.preventDefault();
    var options = event.target.options;
    var value = "";
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
        break;
      }
    }
    this.setState({ [event.target.name]: value });
  }

  handleCategorySelect(event) {
    event.preventDefault();
    var options = event.target.options;
    var name = event.target.name;
    var value = "";
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
        break;
      }
    }

    Api.init(Routes.type.get.byCategory(value)).then(d => {
      let types = d.data;
      if (types.length) {
        let topt = this.generateCategoryOptions(types);
        this.setState({ type: types[0]._id, types, types_option: topt });
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let { data } = await Api.init(Routes.subtype.post.add(), this.state);
      window.location.href = "/category_subtype";
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Snackbar ref={snackbar => (this.snackbar = snackbar)} />
        <div className="container" ref={first => (this.first = first)} id="first">
          <Form method="POST" handleSubmit={this.handleSubmit} title="Add">
            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Name..."
              name="name"
              value={this.state.name}
              handleChange={this.handleChange}
            />

            <Input
              id="score"
              label="Score"
              type="number"
              placeholder="Score..."
              name="score"
              value={this.state.score}
              handleChange={this.handleChange}
            />

            <Input
              id="desc"
              label="Description"
              type="text"
              placeholder="Description..."
              name="desc"
              value={this.state.desc}
              handleChange={this.handleChange}
            />

            <Input
              id="status"
              label="Status"
              type="text"
              placeholder="Status..."
              name="status"
              value={this.state.status}
              handleChange={this.handleChange}
            />

            <Select
              id="category"
              label="Category"
              multiple={false}
              name="category"
              defaultValue={this.state.category}
              value={this.state.category}
              handleChange={this.handleCategorySelect}
            >
              {this.state.categories_option}
            </Select>

            <Select
              id="type"
              label="Type"
              multiple={false}
              name="type"
              defaultValue={this.state.type}
              value={this.state.type}
              handleChange={this.handleSelect}
            >
              {this.state.types_option}
            </Select>

            <hr />
            <Button label="Create" type="submit" />
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default SubTypeCreate;
