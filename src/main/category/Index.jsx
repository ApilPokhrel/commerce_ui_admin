import React from "react";
import DataTable from "../utils/DataTable.jsx";
import Snackbar from "../utils/Snackbar.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";
import Button from "../utils/Button.jsx";
import Config from "../common/Config";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head: ["S.N", "Profile", "Name", "Score", "Description", "Action"],
      body: [],
      filter: [
        {
          key: "sn",
          render: (d, i) => {
            return i + 1;
          }
        },
        {
          key: "files",
          render: (d, i) => {
            return (
              <div>
                <img
                  src={d.files.length ? d.files[0].url + d.files[0].name + "_small.jpg" : ""}
                  alt={d.name}
                ></img>
              </div>
            );
          }
        },
        {
          key: "name",
          render: (d, i) => {
            return d.name || "N/A";
          }
        },
        {
          key: "score",
          render: (d, i) => {
            return d.score || "0";
          }
        },
        {
          key: "desc",
          render: (d, i) => {
            return d.desc || "N/A";
          }
        },
        {
          key: "action",
          render: (d, i) => {
            return (
              <div style={{ display: "inline-block" }}>
                <button className="btn btn-primary" onClick={() => this.view(d.slug)}>
                  View
                </button>
                <button className="btn btn-warning" onClick={() => this.remove(d._id)}>
                  Del
                </button>
              </div>
            );
          }
        }
      ],
      reload: false
    };
  }

  async remove(id) {
    if (confirm("Are you sure!")) {
      try {
        await Api.init(Routes.category.delete.remove(id), {});
        this.setState({ reload: true });
      } catch (err) {
        this.snackbar.open(true, err.message);
      }
      this.setState({ reload: true });
    }
  }

  view(slug) {
    window.location.href = `/category_detail?slug=${slug}`;
  }

  add() {
    window.location.href = `/category_create`;
  }

  render() {
    return (
      <React.Fragment>
        <Snackbar ref={snackbar => (this.snackbar = snackbar)} />
        <div className="container">
          <Button
            label="Add"
            type="button"
            handleChange={() => this.add()}
            style={{ width: "200px", float: "right" }}
          />
          <DataTable
            head={this.state.head}
            body={this.state.body}
            filter={this.state.filter}
            threshold={4}
            server={true}
            total={this.state.body.length}
            url={`${Config.api.base.url}${Routes.category.get.list().url}`}
            reload={this.state.reload}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Category;
