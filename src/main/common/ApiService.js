import Axios from "axios";
import Config from "./Config";
import ApiError from "./ApiError";

let call = (url, method, headers, data) => {
  return Axios({
    method: method,
    url: url,
    data,
    headers
  });
};

export default {
  init: async (route, data, hdrs) => {
    let result;
    try {
      let fullUrl = Config.api.base.url + route.url;
      let method = route.method;
      let access_token = localStorage.getItem("access_token");
      let refresh_token = localStorage.getItem("refresh_token");
      var headers = { ...hdrs, ...{ token: access_token } };
      try {
        result = await call(fullUrl, method, headers, data);
      } catch (err) {
        if (err.response.status === 403) {
          let d = { refreshtoken: refresh_token };
          result = await call(`${Config.api.base.url}/auth/grant`, "post", headers, d);
          access_token = result.data;
          headers = headers = { ...hdrs, ...{ token: access_token } };
          localStorage.setItem("access_token", access_token);
          return call(fullUrl, method, headers, data);
        } else {
          let data;
          if (err.response.data.message) {
            data = err.response.data.message;
          } else {
            data = JSON.stringify(err.response.data);
          }

          throw new ApiError(err.response.status, data);
        }
      }
    } catch (e) {
      throw new ApiError(e.name, e.message);
    }
    return result;
  },

  upload: async (route, files) => {
    let result;
    try {
      let fullUrl = Config.api.base.url + route.url;
      let access_token = localStorage.getItem("access_token");
      let refresh_token = localStorage.getItem("refresh_token");
      let formData = new FormData();
      let fls = [];
      for (const key of Object.keys(files)) {
        formData.append("files", files[key]);
      }
      try {
        result = await Axios.post(fullUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: access_token
          }
        });
      } catch (err) {
        if (err.response.status === 403) {
          let d = { refreshtoken: refresh_token };
          let hdrs = { refreshtoken: refresh_token };
          result = await call(`${Config.api.base.url}/auth/grant`, "post", hdrs, d);
          access_token = result.data;
          headers = headers = { ...hdrs, ...{ token: access_token } };
          localStorage.setItem("access_token", access_token);
          return Axios.post(fullUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: access_token
            }
          });
        } else {
          let data;
          if (err.response.data.message) {
            data = err.response.data.message;
          } else {
            data = JSON.stringify(err.response.data);
          }

          throw new ApiError(err.response.status, data);
        }
      }
    } catch (e) {
      throw new ApiError(e.name, e.message);
    }
    return result;
  },

  isUiAuthenticated: async () => {
    let result = true;

    try {
      let fullUrl = Config.api.base.url + Config.ui.restrict.url;
      let method = Config.ui.restrict.method;
      let access_token = localStorage.getItem("access_token");
      let refresh_token = localStorage.getItem("refresh_token");
      var headers = { token: access_token };
      try {
        await call(fullUrl, method, headers, data);
      } catch (err) {
        if (err.response.status === 403) {
          let d = { refreshtoken: refresh_token };
          await call(`${Config.api.base.url}/auth/grant`, "post", headers, d);
          access_token = result.data;
          headers = { token: access_token };
          localStorage.setItem("access_token", access_token);
          result = await call(fullUrl, method, headers, data);
        } else {
          result = false;
        }
      }
    } catch (e) {
      result = false;
    }
    return result;
  }
};
