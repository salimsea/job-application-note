import { UserService } from "src/services";
import { FUNCHandleRequest, loadingBar } from "src/utils";
import Swal from "sweetalert2/dist/sweetalert2";

export const actUserSession = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      UserService.getInfoUser().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({ type: "DATA_USER_SESSION", payload: data.Data });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actUserInfo = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      UserService.getInfoUser().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({ type: "DATA_INFO_USER", payload: data.Data });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actUserGetAll = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      UserService.getAll().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({ type: "DATA_USERS", payload: data.Data });
        } else {
          if (data.ReturnMessage !== "data not found")
            Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actUserGetById = (id, history = null) => {
  return (dispatch) => {
    loadingBar(true);
    FUNCHandleRequest(() =>
      UserService.getById(id).then((res) => {
        loadingBar(false);
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({ type: "DATA_USER", payload: data.Data });
          if (history) history.push(`/users/edit/${id}`);
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actUserAdd = (iData) => {
  return () => {
    loadingBar(true);
    var fd = new FormData();
    fd.append("username", iData.username);
    fd.append("firstName", iData.firstName);
    fd.append("middleName", iData.middleName || "");
    fd.append("lastName", iData.lastName || "");
    fd.append("email", iData.email);
    iData.roles?.forEach((item, index) => {
      fd.append(`roles[${index}]`, item.value);
    });
    FUNCHandleRequest(() =>
      UserService.add(fd).then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          Swal.fire("Success", "User created successfully!", "success").then(
            () => (window.location = "/users")
          );
        } else {
          Swal.fire("Failed", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actUserEdit = (iData) => {
  return () => {
    loadingBar(true);
    var fd = new FormData();
    fd.append("id", iData.id);
    fd.append("username", iData.username);
    fd.append("email", iData.email);
    fd.append("firstName", iData.firstName);
    fd.append("middleName", iData.middleName || "");
    fd.append("lastName", iData.lastName || "");
    iData.roles?.forEach((item, index) => {
      fd.append(`roles[${index}]`, item.value);
    });
    FUNCHandleRequest(() =>
      UserService.edit(fd).then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          Swal.fire("Success", "User successfully updated!", "success").then(
            () => (window.location = "/users")
          );
        } else {
          Swal.fire("Failed", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actUserDelete = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will delete this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        loadingBar(true);
        FUNCHandleRequest(() =>
          UserService.delete(id).then((res) => {
            var data = res.data;
            if (data?.IsSuccess) {
              Swal.fire(
                "Success",
                "User successfully deleted!",
                "success"
              ).then(() => dispatch(actUserGetAll()));
            } else {
              Swal.fire("Failed", `${data.ReturnMessage}`, "error");
            }
          })
        );
      }
    });
  };
};

export const actUserEditProfile = (iData) => {
  return () => {
    loadingBar(true);
    var fd = new FormData();
    fd.append("email", iData.email);
    fd.append("firstName", iData.firstName);
    fd.append("middleName", iData.middleName || "");
    fd.append("lastName", iData.lastName || "");
    fd.append("linkCv", iData.linkCv);
    fd.append("summary", iData.summary);
    FUNCHandleRequest(() =>
      UserService.editProfile(fd).then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          Swal.fire(
            "Success",
            "User profile successfully updated!",
            "success"
          ).then(() => (window.location = "/editprofile"));
        } else {
          Swal.fire("Failed", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};
