import Swal from "sweetalert2/dist/sweetalert2";

export const loadingBar = (bool = true) => {
  if (bool) {
    Swal.fire({
      title: "Loading",
      html: "Please wait a moment...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }
};
