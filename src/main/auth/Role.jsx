import React from "react";
import DataTable from "../utils/DataTable.jsx";
import Modal from "../utils/Modal.jsx";
import Input from "../utils/Input.jsx";
import Form from "../utils/Form.jsx";
import Button from "../utils/Button.jsx";
import Select from "../utils/Select.jsx";
import Api from "../common/ApiService";
import Routes from "../common/Routes";

let create = props => {
  const [state, setState] = React.useState({
    name: "",
    permissions: [],
    desc: "",
    is_admin: false,
    head: ["S.N", "Name", "Description", "Permissions", "Action"],
    body: [],
    options: "",
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
        key: "desc",
        render: (d, i) => {
          return d.desc || "N/A";
        }
      },
      {
        key: "permissions",
        render: (d, i) => {
          return d.permissions.map((e, i) => {
            return `${e.name}, \n`;
          });
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
              <button className="btn btn-warning" onClick={() => deleteRole(d._id)}>
                Del
              </button>
            </div>
          );
        }
      }
    ],
    reload: false,
    role_id: "",
    modal: false,
    addModal: false,
    perms: []
  });

  React.useEffect(() => {
    getPermissions();
  }, []);

  const handleChange = name => event => {
    event.preventDefault();
    setState({ ...state, [name]: event.target.value });
  };

  const handleSelect = name => event => {
    event.preventDefault();
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setState({ ...state, [name]: value });
  };

  const closeModal = () => {
    setState({ ...state, ["modal"]: false, ["addModal"]: false });
  };

  const deleteRole = async id => {
    if (confirm("delete role")) {
      await Api.init(Routes.role.delete.remove(id), {});
      alert("Role Deleted");
    }
  };
  const openModal = async id => {
    if (state.modal) {
      setState({ ...state, ["modal"]: false });
    } else {
      let {
        data: { _id, name, permissions, desc }
      } = await Api.init(Routes.role.get.detail(id), state);
      let opt = await generateOptions();
      setState({
        ...state,
        ["modal"]: true,
        ["name"]: name,
        ["desc"]: desc,
        ["role_id"]: _id,
        ["permissions"]: permissions,
        ["options"]: opt
      });
    }
  };
  const generateOptions = async () => {
    let perms = await getPermissions();
    return perms.map((e, i) => {
      return (
        <option key={i} value={e._id}>
          {e.name}
        </option>
      );
    });
  };

  const openAddModal = () => {
    if (state.addModal) {
      setState({ ...state, ["addModal"]: false });
    } else {
      setState({ ...state, ["addModal"]: true });
    }
  };

  const getPermissions = () => {
    return Api.init(Routes.permission.get.search(), {}).then(perms => {
      setState({ ...state, ["perms"]: perms.data || [] });
      return perms.data;
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let {
      data: { name, permissions, desc }
    } = await Api.init(Routes.role.post.create(), state);
    alert("Role Created");
  };

  const handleEdit = async event => {
    event.preventDefault();
    if (confirm("Edit role")) {
      let {
        data: { name, permissions, desc }
      } = await Api.init(Routes.role.patch.edit(state.role_id), state);
      setState({
        ...state,
        ["modal"]: false,
        ["name"]: name,
        ["desc"]: desc,
        ["permissions"]: permissions
      });
      props.history.push(location.pathname);
    }
  };

  return (
    <div className="container">
      <input type="hidden" value="" id="perm_id" />

      <Modal open={state.addModal} type="medium" close={() => closeModal()}>
        <Form method="POST" handleSubmit={handleSubmit}>
          <Input
            id="r-name"
            label="Name"
            name="name"
            type="text"
            placeholder="Role Name"
            value={state.name}
            handleChange={handleChange("name")}
          />

          <Input
            id="r-desc"
            label="Description"
            type="text"
            placeholder="Description"
            name="desc"
            value={state.desc}
            handleChange={handleChange("desc")}
          />

          <Select
            id="p-permissions"
            label="Permissions"
            multiple={true}
            name="permissions"
            value={state.permissions}
            handleChange={handleSelect("permissions")}
          >
            {state.perms.map((e, i) => (
              <option key={i} value={e._id}>
                {e.name}
              </option>
            ))}
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
        url={`http://localhost:3000/auth/role`}
        headers={{}}
        reload={state.reload}
      />
      <Modal open={state.modal} type="medium" close={() => closeModal()}>
        <Form method="POST" handleSubmit={handleEdit} width="100%">
          <Input
            id="r-name"
            label="Name"
            name="name"
            type="text"
            placeholder="Role Name"
            value={state.name}
            handleChange={handleChange("name")}
          />

          <Input
            id="r-desc"
            label="Description"
            type="text"
            placeholder="Description"
            name="desc"
            value={state.desc}
            handleChange={handleChange("desc")}
          />

          <Select
            id="p-permissions"
            label="Permissions"
            multiple={true}
            name="permissions"
            defaultValue={state.permissions}
            options={state.options}
            value={state.permissions}
            handleChange={handleSelect("permissions")}
          >
            {state.options}
          </Select>

          <hr />
          <Button label="Submit" type="submit" width="100%" />
        </Form>
      </Modal>
    </div>
  );
};

export default create;
