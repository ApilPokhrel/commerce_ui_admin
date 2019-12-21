import React from "react";
import Snackbar from "../utils/Snackbar.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Button from "../utils/Button.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import FileHandler from "../common/FileHandler";

let fileLi = {
  display: "inline-block",
  padding: "20px",
  border: "1px solid #ddd"
};

class DetailCategory extends React.Component {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const slug = params.get("slug");
    this.state = {
      name: "",
      desc: "",
      files: [],
      fls: [],
      score: 0,
      status: "",
      slug,
      _id: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async componentDidMount() {
    let { data } = await Api.init(Routes.category.get.detail(this.state.slug), {});
    this.setState({
      name: data.name,
      desc: data.desc,
      score: data.score,
      status: data.status,
      files: data.files,
      slug: data.slug,
      _id: data._id
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let {
        data: { slug }
      } = await Api.init(Routes.category.patch.edit(this.state.slug), this.state);
      const params = new URLSearchParams(window.location.search);
      params.set("slug", slug);
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  async handleFileSubmit(event) {
    event.preventDefault();
    try {
      await Api.upload(Routes.category.post.upload(this.state.slug), this.state.fls);
      window.location.reload();
    } catch (err) {
      this.snackbar.open(true, err.message);
    }
  }

  async removeFile(id) {
    if (confirm("Are you sure!")) {
      try {
        let { data } = await Api.init(Routes.category.delete.removeFile(this.state._id), {
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

export default DetailCategory;
