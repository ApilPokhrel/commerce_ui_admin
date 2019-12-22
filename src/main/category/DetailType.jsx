import React from "react";
import Snackbar from "../utils/Snackbar.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Button from "../utils/Button.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import FileHandler from "../common/FileHandler";
import Select from "../utils/Select.jsx";

let fileLi = {
  display: "inline-block",
  padding: "20px",
  border: "1px solid #ddd"
};

class DetailType extends React.Component {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");
    this.state = {
      name: "",
      desc: "",
      files: [],
      fls: [],
      score: 0,
      status: "",
      category: "",
      categories_option: [],
      categories: [],
      id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.removeFile = this.removeFile.bind(this);
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

  async componentDidMount() {
    let type = await Api.init(Routes.type.get.detail(this.state.id), {});
    let d = type.data;

    let {
      data: { data }
    } = await Api.init(Routes.category.get.list2(100, 0), {});
    let copt = await this.generateCategoryOptions(data);
    this.setState({
      name: d.name,
      desc: d.desc,
      score: d.score,
      status: d.status,
      files: d.files,
      id: d._id,
      categories_option: copt,
      categories: data,
      category: d.category
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let {
        data: { _id }
      } = await Api.init(Routes.type.patch.edit(this.state.id), this.state);
      const params = new URLSearchParams(window.location.search);
      params.set("id", _id);
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  async handleFileSubmit(event) {
    event.preventDefault();
    try {
      await Api.upload(Routes.type.post.upload(this.state.id), this.state.fls);
      window.location.reload();
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  async removeFile(id) {
    if (confirm("Are you sure!")) {
      try {
        let { data } = await Api.init(Routes.type.delete.removeFile(this.state.id), {
          _id: id
        });
        window.location.reload();
      } catch (err) {
        this.snackbar.open(true, err.message);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Snackbar ref={snackbar => (this.snackbar = snackbar)} />
        <div className="container">
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
              handleChange={this.handleSelect}
            >
              {this.state.categories_option}
            </Select>

            <hr />
            <Button label="Edit" type="submit" />
          </Form>
        </div>
        <div className="container">
          <div className="files">
            <ul>
              {this.state.files.map((f, i) => {
                return (
                  <li key={i} style={fileLi}>
                    {f.type.startsWith("image/") ? (
                      <img src={`${f.url}${f.name}_medium.jpg`} />
                    ) : (
                      <video
                        id="vid"
                        style={{
                          height: "210px",
                          width: "202px",
                          marginTop: "5px",
                          marginLeft: "-10px"
                        }}
                        controls
                      >
                        <source src={`${f.url}${f.name}.${f.type.split("/")[1]}`} id="video_here" />
                        Your browser does not support HTML5 video.
                      </video>
                    )}

                    <Button
                      label="Delete"
                      type="button"
                      style={{ height: "40px", margin: "10px" }}
                      handleChange={() => this.removeFile(f._id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="preview" ref={preview => (this.preview = preview)}></div>
          <Form method="POST" handleSubmit={this.handleFileSubmit} title="Add">
            <Input
              id="fls"
              label="Files"
              type="file"
              placeholder="Status..."
              name="fls"
              multiple={true}
              value={this.fls}
              handleChange={this.handleFileChange}
            />

            <hr />
            <Button label="Upload" type="submit" />
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailType;
