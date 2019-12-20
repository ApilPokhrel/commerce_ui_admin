import React from "react";
import { Route, Redirect } from "react-router-dom";
import Api from "../common/ApiService";

let PrivateRoute = props => (
  <React.Fragment>
    {Api.isUiAuthenticated() ? props.children : <Redirect to="/login" />}
  </React.Fragment>
);

export default PrivateRoute;
