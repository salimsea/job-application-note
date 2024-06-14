import { RefService } from "src/services";
import { FUNCArraySelectId, FUNCHandleRequest } from "src/utils";
import Swal from "sweetalert2/dist/sweetalert2";

export const actRefGetRoles = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      RefService.getRoles().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({
            type: "DATA_REF_ROLES",
            payload: FUNCArraySelectId(data.Data),
          });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actRefGetTypeWorkDays = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      RefService.getTypeWorkDay().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({
            type: "DATA_REF_TYPE_WORK_DAYS",
            payload: FUNCArraySelectId(data.Data),
          });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actRefGetTypeWorkPlaces = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      RefService.getTypeWorkPlace().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({
            type: "DATA_REF_TYPE_WORK_PLACES",
            payload: FUNCArraySelectId(data.Data),
          });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actRefGetTypeUserCompanies = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      RefService.getTypeUserCompany().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({
            type: "DATA_REF_TYPE_USER_COMPANIES",
            payload: FUNCArraySelectId(data.Data),
          });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};

export const actRefGetStatusCompanies = () => {
  return (dispatch) => {
    FUNCHandleRequest(() =>
      RefService.getStatusCompany().then((res) => {
        var data = res.data;
        if (data.IsSuccess) {
          dispatch({
            type: "DATA_REF_STATUS_COMPANIES",
            payload: FUNCArraySelectId(data.Data),
          });
        } else {
          Swal.fire("Gagal", `${data.ReturnMessage}`, "error");
        }
      })
    );
  };
};
