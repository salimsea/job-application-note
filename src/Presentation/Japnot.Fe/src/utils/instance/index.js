import axios from "axios";
import { AuthService } from "src/services";
import Swal from "sweetalert2/dist/sweetalert2";

export const instanceAuth = axios.create({
  baseURL: process.env.REACT_APP_URLSVC,
  timeout: 1000000,
  withCredentials: false,
});

instanceAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("TOKEN");
    if (token && token.length > 0)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");
        const res = await AuthService.refreshToken(refreshToken);
        const { Data } = res.data;
        localStorage.setItem("TOKEN", Data);
        return instanceAuth(originalRequest);
      } catch (_error) {
        localStorage.clear();
        Swal.fire(
          "Session Expired",
          `Token expired. Please try login again`,
          "error"
        ).then(() => (window.location = "/"));
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

// instanceAuth.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       const { data } = error.response;
//       if (error.response.status === 401) {
//         if (
//           data.name === "NotAuthenticated" &&
//           data.data &&
//           data.data.name === "TokenExpiredError"
//         ) {
//           Swal.fire(
//             "Session Expired",
//             `Token expired. Please try login again`,
//             "error"
//           ).then(() => (window.location = "/"));
//           return Promise.reject({
//             message: "Token expired. Please try login again.",
//           });
//         } else {
//           Swal.fire(
//             "Session Expired",
//             `Token expired. Please try login again`,
//             "error"
//           ).then(() => (window.location = "/"));
//           localStorage.clear();
//           return Promise.reject({
//             message: "Login failed. Please check your email and password!",
//           });
//         }
//       } else {
//         Swal.fire(
//           "Terjadi Kesalahan",
//           `${JSON.stringify(error.message)}`,
//           "error"
//         );
//         let message = data.message || error.message;
//         return Promise.reject({ message, raw: data });
//       }
//     } else if (error.request) {
//       Swal.fire(
//         "Terjadi Kesalahan",
//         "There is problem connecting to server. Please check your connection!",
//         "error"
//       );
//       return;
//     } else {
//       Swal.fire(
//         "Terjadi Kesalahan",
//         "There is problem connecting to server. Please check your connection!",
//         "info"
//       );
//       return;
//     }
//   }
// );

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URLSVC,
  timeout: 20000,
  withCredentials: false,
  headers: {},
});

export const instanceSdi = axios.create({
  baseURL: process.env.REACT_APP_URLSVC_SDI,
  timeout: 20000,
  withCredentials: false,
  headers: {},
});
