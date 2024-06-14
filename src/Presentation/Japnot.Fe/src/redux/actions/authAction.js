import { AuthService } from "src/services";
import { loadingBar } from "src/utils";
import Swal from "sweetalert2/dist/sweetalert2";

export const actFormLogin = (formType, formValue) => {
  return { type: "FORM_LOGIN", formType, formValue };
};
export const actFormForgetPassword = (formType, formValue) => {
  return { type: "FORM_FORGET_PASSWORD", formType, formValue };
};

export const actLogin = (iData) => {
  return (dispatch) => {
    if (!iData.usernameOrEmail) {
      Swal.fire("Failed", `username or email is required!`, "error");
      return;
    }
    if (!iData.password) {
      Swal.fire("Failed", `password must be filled!`, "error");
      return;
    }
    loadingBar(true);
    var fd = new FormData();
    fd.append("usernameOrEmail", iData.usernameOrEmail);
    fd.append("password", iData.password);
    AuthService.login(fd).then((res) => {
      var data = res.data;
      if (data.IsSuccess) {
        localStorage.setItem("TOKEN", data.Data.Token);
        Swal.fire("Success", `Welcome...`, "success").then(
          () => (window.location = "/dashboard")
        );
      } else {
        Swal.fire("Failed", `${data.ReturnMessage}`, "error");
      }
    });
  };
};
