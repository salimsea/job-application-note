import { CompanyService } from "src/services";
import { FUNCDateToString, FUNCHandleRequest, loadingBar } from "src/utils";
import Swal from "sweetalert2/dist/sweetalert2";

export const actCompanyGetAll = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      CompanyService.getAll().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({ type: "DATA_COMPANIES", payload: data.Data });
        } else {
          if (data.ReturnMessage !== "data not found")
            Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};
export const actCompanyGetById = (id, history) => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      CompanyService.getById(id).then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({ type: "DATA_COMPANY", payload: data.Data });
          if (history) history.push(`/company/edit/${id}`);
        } else {
          if (data.ReturnMessage !== "data not found")
            Swal.fire("failed", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actCompanyAdd = (iData) => {
  return () => {
    loadingBar(true);
    var fd = new FormData();
    fd.append("name", iData.name);
    fd.append("email", iData.email);
    fd.append("position", iData.position);
    fd.append("typeWorkDay", iData.typeWorkDay[0].value);
    fd.append("typeWorkPlace", iData.typeWorkPlace[0].value);
    fd.append("typeUserCompany", iData.typeUserCompany[0].value);
    fd.append("placement", iData.placement);
    fd.append("strAppliedAt", FUNCDateToString(iData.strAppliedAt));
    fd.append("status", iData.status[0].value);
    fd.append("sourceJob", iData.sourceJob);
    FUNCHandleRequest(() =>
      CompanyService.add(fd).then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          Swal.fire(
            "Success",
            "Job apply created successfully!",
            "success"
          ).then(() => (window.location = "/companies"));
        } else {
          Swal.fire("Failed", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actCompanyEdit = (iData) => {
  return () => {
    loadingBar(true);
    var fd = new FormData();
    fd.append("id", iData.id);
    fd.append("name", iData.name);
    fd.append("email", iData.email);
    fd.append("position", iData.position);
    fd.append("typeWorkDay", iData.typeWorkDay[0].value);
    fd.append("typeWorkPlace", iData.typeWorkPlace[0].value);
    fd.append("typeUserCompany", iData.typeUserCompany[0].value);
    fd.append("placement", iData.placement);
    fd.append("strAppliedAt", FUNCDateToString(iData.strAppliedAt));
    fd.append("status", iData.status[0].value);
    fd.append("sourceJob", iData.sourceJob);
    FUNCHandleRequest(() =>
      CompanyService.edit(fd).then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          Swal.fire(
            "Success",
            "Job apply successfully updated!",
            "success"
          ).then(() => (window.location = "/companies"));
        } else {
          Swal.fire("Failed", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actCompanyDelete = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will delete this job apply!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        loadingBar(true);
        FUNCHandleRequest(() =>
          CompanyService.delete(id).then((res) => {
            var data = res.data;
            if (data?.IsSuccess) {
              Swal.fire(
                "Success",
                "Job apply successfully deleted!",
                "success"
              ).then(() => dispatch(actCompanyGetAll()));
            } else {
              Swal.fire("Failed", `${data.ReturnMessage}`, "error");
            }
          })
        );
      }
    });
  };
};
