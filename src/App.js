import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppCss from "./res/css/App.css";
import Navbar from "./main/utils/Navbar.jsx";
import LoginContainer from "./main/user/Login.jsx";
import RegisterContainer from "./main/user/Register.jsx";
import Notfound from "./main/utils/NotFound.jsx";
import PermissionCreate from "./main/auth/Permission.jsx";
import Role from "./main/auth/Role.jsx";
import UserAdmin from "./main/user/Index.jsx";
import EditUser from "./main/user/Edit.jsx";
import PrivateRoute from "./main/utils/PrivateRoute.jsx";
import Category from "./main/category/Index.jsx";
import CategoryCreate from "./main/category/CreateCategory.jsx";
import CategoryDetail from "./main/category/DetailCategory.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute>
          <Route exact path="/" activeClassName="active" component={UserAdmin} />
          <Route path="/role" activeClassName="active" component={Role} />
          <Route path="/permission" activeClassName="active" component={PermissionCreate} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/user" component={EditUser} />
          <Route path="/category" component={Category} />
          <Route path="/category_create" component={CategoryCreate} />
          <Route path="/category_detail" component={CategoryDetail} />
        </PrivateRoute>
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
