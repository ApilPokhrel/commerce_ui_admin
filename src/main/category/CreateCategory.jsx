import React from "react";
import Snackbar from "../utils/Snackbar.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Button from "../utils/Button.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import FileHandler from "../common/FileHandler";

class CategoryCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      status: "",
      score: 0,
      files: "",
      conatiner: "first",
      slug: undefined,
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      if (!slug) {
        let {
          data: { slug }
        } = await Api.init(Routes.category.post.add(), this.state);

        this.setState({ slug });
      }
      await Api.upload(Routes.category.post.upload(this.state.slug), this.state.files);
      window.location.href = "/category";
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

export default CategoryCreate;
