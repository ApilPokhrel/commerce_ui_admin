import React from "react";
import Snackbar from "../utils/Snackbar.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Button from "../utils/Button.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import FileHandler from "../common/FileHandler";
import Select from "../utils/Select.jsx";

class TypeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      category: "",
      status: "",
      score: 0,
      categories_option: [],
      categories: [],
      files: "",
      conatiner: "first",
      id: undefined,
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelect(event) {
    event.preventDefault();
    var options = event.target.options;
    var value = "";
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
      }
    }
    this.setState({ [event.target.name]: value });
  }

  async componentDidMount() {
    let {
      data: { data }
    } = await Api.init(Routes.category.get.list2(100, 0), {});
    let copt = await this.generateCategoryOptions(data);
    this.setState({ categories_option: copt, categories: data, category: data[0]._id });
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

  handleFileChange(event) {
    this.setState({ [event.target.name]: event.target.files });
    FileHandler.file = event.target;
    FileHandler.finput = event.target;
    FileHandler.previewDiv = "preview";
    FileHandler.preview();
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      if (!this.state.id) {
        let {
          data: { _id }
        } = await Api.init(Routes.type.post.add(), this.state);

        this.setState({ id: _id });
      }
      await Api.upload(Routes.type.post.upload(this.state.id), this.state.files);
      window.location.href = "/category_type";
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  next(event) {
    event.preventDefault();
    this.first.style.display = "none";
    this.second.style.display = "block";
    this.setState({ container: "second" });
  }

  back() {
    this.first.style.display = "block";
    this.second.style.display = "none";
    this.setState({ container: "first" });
  }

  render() {
    return (
      <React.Fragment>
        <Snackbar ref={snackbar => (this.snackbar = snackbar)} />
        <div className="container" ref={first => (this.first = first)} id="first">
          <Form method="POST" handleSubmit={this.next} title="Add">
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
              handleChange={this.handleSelect}
            >
              {this.state.categories_option}
            </Select>

            <hr />
            <Button label="Next" type="submit" />
          </Form>
        </div>

        <div
          className="container"
          ref={second => (this.second = second)}
          id="second"
          style={{ display: "none" }}
        >
          <div id="preview" ref={preview => (this.preview = preview)}></div>

          <Form method="POST" handleSubmit={this.handleSubmit} title="Add">
            <Input
              id="files"
              label="Files"
              type="file"
              placeholder="Status..."
              name="files"
              multiple={true}
              value={this.files}
              handleChange={this.handleFileChange}
            />

            <hr />
            <Button label="Submit" type="submit" />
          </Form>
          <Button
            label="<<Back"
            type="button"
            style={{ width: "200px", float: "right" }}
            handleChange={() => this.back()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TypeCreate;
