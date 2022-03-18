import Vue from "vue"
import vueResource from "vue-resource"
Vue.use(vueResource)
// const  baseUrl = "http://119.45.239.51:8081/";
const baseUrl = "http://localhost:8081/";
const http = {

  getRequest(url, cb) {
    return new Promise((resolve, reject) => {
      Vue.http.get(
        baseUrl + url,
        { emulateJSON: true }
      )
        .then(cb)
        .catch((err) => {
          reject(err);
        });
    });
  },
  postRequest(url, params, cb) {
    return new Promise((resolve, reject) => {
      Vue.http.post(
        url,
        params,
        { emulateJSON: true }
      )
        .then(cb)
        .catch((err) => {
          reject(err);
        });
    });
  }
}
export default http