import React from "react";
import DataTable from "../utils/DataTable.jsx";
import Modal from "../utils/Modal.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import Button from "../utils/Button.jsx";
import Select from "../utils/Select.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";

let create = () => {
  const [state, setState] = React.useState({
    name: "",
    resource: "",
    method: "post",
    url: "http://localhost:3000/auth/permission",
    baseUrl: "http://localhost:3000",
    desc: "",
    head: ["S.N", "Name", "Method", "Resource", "Description", "Action"],
    body: [],
    filter: [
      {
        key: "sn",
        render: (d, i) => {
          return i + 1;
        }
      },
      {
        key: "name",
        render: (d, i) => {
          return d.name || "N/A";
        }
      },
      {
        key: "method",
        render: (d, i) => {
          return d.method || "N/A";
        }
      },
      {
        key: "resource",
        render: (d, i) => {
          return d.resource || "N/A";
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
              <button className="btn btn-primary" onClick={() => openModal(d._id)}>
                Edit
              </button>
              <button className="btn btn-warning" onClick={() => deletePerm(d._id)}>
                Del
              </button>
            </div>
          );
        }
      }
    ],
    reload: false,
    perm_id: "",
    modal: false,
    addModal: false
  });

  const handleChange = name => event => {
    event.preventDefault();
    setState({ ...state, [name]: event.target.value });
  };

  const closeModal = () => {
    setState({ ...state, ["modal"]: false, ["addModal"]: false });
  };

  const deletePerm = async id => {
    if (confirm("Delete Permission")) {
      await Api.init(Routes.permission.delete.remove(id), {});
      setState({ ...state, ["reload"]: true });
    }
  };
  const openModal = async id => {
    if (state.modal) {
      setState({ ...state, ["modal"]: false });
    } else {
      let {
        data: { _id, name, method, resource, desc }
      } = await Api.init(Routes.permission.get.detail(id), state);
      setState({
        ...state,
        ["modal"]: true,
        ["name"]: name,
        ["method"]: method.toLowerCase(),
        ["resource"]: resource,
        ["desc"]: desc,
        ["perm_id"]: _id
      });
    }
  };

  const openAddModal = () => {
    if (state.addModal) {
      setState({ ...state, ["addModal"]: false });
    } else {
      setState({ ...state, ["addModal"]: true });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await Api.init(Routes.permission.post.create(), state);
    alert("Permission Created");
    setState({ ...state, ["modal"]: false });
    setState({ ...state, ["reload"]: true });
  };

  const handleEdit = async event => {
    event.preventDefault();
    let {
      data: { name, method, resource, desc }
    } = await Api.init(Routes.permission.patch.edit(state.perm_id), state);
    setState({
      ...state,
      ["modal"]: true,
      ["name"]: name,
      ["method"]: method.toLowerCase(),
      ["resource"]: resource,
      ["desc"]: desc,
      ["reload"]: true
    });
    alert("Permission Edited");
    setState({ ...state, ["addModal"]: false });
    setState({ ...state, ["reload"]: true });
  };

  return (
    <div className="container">
      <Modal open={state.addModal} type="medium" close={() => closeModal()}>
        <Form method="POST" handleSubmit={handleSubmit} width="100%">
          <Input
            id="p-name"
            label="Name"
            name="name"
            type="text"
            value={state.name}
            handleChange={handleChange("name")}
          />

          <Input
            id="p-resource"
            label="Resource"
            type="text"
            placeholder="Resource"
            name="resource"
            value={state.resource}
            handleChange={handleChange("resource")}
          />

          <Input
            id="p-desc"
            label="Description"
            type="text"
            placeholder="Description"
            name="desc"
            value={state.desc}
            handleChange={handleChange("desc")}
          />

          <Select
            id="p-action"
            label="Action"
            multiple={false}
            name="action"
            value={state.method}
            handleChange={handleChange("method")}
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="patch">PATCH</option>
            <option value="delete">DELETE</option>
            <option value="put">PUT</option>
          </Select>

          <hr />
          <Button label="Submit" type="submit" />
        </Form>
      </Modal>
      <Button
        label="Add"
        type="button"
        handleChange={() => openAddModal()}
        style={{ width: "200px", float: "right" }}
      />
      <DataTable
        head={state.head}
        body={state.body}
        filter={state.filter}
        threshold={10}
        server={true}
        total={5}
        url={`http://localhost:3000/auth/permission`}
        headers={{}}
        reload={state.reload}
      />
      <Modal open={state.modal} type="medium" close={() => closeModal()}>
        <Form method="POST" handleSubmit={handleEdit} width="100%">
          <Input
            id="p-name"
            label="Name"
            name="name"
            type="text"
            placeholder="Permission Name"
            value={state.name}
            handleChange={handleChange("name")}
          />

          <Input
            id="p-resource"
            label="Resource"
            type="text"
            placeholder="Resource"
            name="resource"
            value={state.resource}
            handleChange={handleChange("resource")}
          />

          <Input
            id="p-desc"
            label="Description"
            type="text"
            placeholder="Description"
            name="desc"
            value={state.desc}
            handleChange={handleChange("desc")}
          />

          <Select
            id="p-action"
            label="Action"
            multiple={false}
            name="action"
            defaultValue={state.method}
            handleChange={handleChange("method")}
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="patch">PATCH</option>
            <option value="delete">DELETE</option>
            <option value="put">PUT</option>
          </Select>

          <hr />
          <Button label="Submit" type="submit" width="100%" />
        </Form>
      </Modal>
    </div>
  );
};

export default create;
