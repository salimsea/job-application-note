import Swal from "sweetalert2/dist/sweetalert2";

export const FUNCGetPath = () => {
  var res = window.location.pathname;
  var baseUrl = process.env.PUBLIC_URL;
  baseUrl = baseUrl.split("/");
  res = res.split("/");
  res = res.length > 0 ? res[baseUrl.length] : "/";
  res = res ? res : "/";
  const activeKey1 = res;
  return activeKey1;
};

export const FUNCSetFullName = (FirstName, MiddleName, LastName) => {
  var satu = FirstName || " ";
  var dua = MiddleName || " ";
  var tiga = LastName || " ";
  return satu + " " + dua + " " + tiga;
};

export const FUNCArraySelectId = (data) => {
  var array = [];
  data.map((v, i) =>
    array.push({
      value: v.Id,
      label: v.Name || v.Nama,
    })
  );
  return array;
};

export const FUNCArraySelectKode = (data) => {
  var array = [];
  data.map((v, i) =>
    array.push({
      value: v.Kode || v.Code,
      label: v.Name || v.Nama,
    })
  );
  return array;
};

export const FUNCValidateUploadFileSize = (
  fi,
  maxSize = 2048,
  strMaxSize = "2MB"
) => {
  if (fi.files.length > 0) {
    for (var i = 0; i <= fi.files.length - 1; i++) {
      const fsize = fi.files.item(i).size;
      const file = Math.round(fsize / 1024);
      if (file >= maxSize) {
        Swal.fire(
          "Gagal",
          `Ukuran file terlalu besar, batas ukuran ${strMaxSize}`,
          "error"
        );
        fi.value = "";
        return null;
      }
    }
  }
};

export const FUNCValidateUploadFileExtension = (
  oInput,
  _validFileExtensions = [".pdf"]
) => {
  var sFileName = oInput.value;
  if (sFileName.length > 0) {
    var blnValid = false;
    var msgExtension = "";
    for (var j = 0; j < _validFileExtensions.length; j++) {
      msgExtension += _validFileExtensions[j] + " ";
      var sCurExtension = _validFileExtensions[j];
      if (
        sFileName
          .substr(sFileName.length - sCurExtension.length, sCurExtension.length)
          .toLowerCase() === sCurExtension.toLowerCase()
      ) {
        blnValid = true;
        break;
      }
    }

    if (!blnValid) {
      Swal.fire(
        "Gagal",
        `Ekstensi file tidak didukung! <br /> format harus ${msgExtension}`,
        "error"
      );
      oInput.value = "";
      return false;
    }
  }
};

export const FUNCHandleRequest = (requestFn) => {
  return requestFn()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const FUNCIsImage = (link) => {
  const imageRegex = /\.(jpeg|jpg|gif|png|svg)$/;
  return imageRegex.test(link);
};

export const FUNCFileConvertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const FUNCConvertArrayToGroup = (jsonData) => {
  const result = [];
  const groups = {};

  for (let i = 0; i < jsonData.length; i++) {
    const item = jsonData[i];
    const name = item.name;
    const layer = item.layer;

    if (name in groups) {
      groups[name].layers.push(layer);
    } else {
      groups[name] = {
        name: name,
        layers: [layer],
      };
    }
  }

  for (const groupName in groups) {
    result.push(groups[groupName]);
  }

  return result;
};

export const FUNCFormatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("id-ID", options);
  const [day, month, year] = formattedDate.split("/");
  return `${day}-${month}-${year}`;
};

export const FUNCDateDmytoYmd = (date) => {
  var b = date.split(/\D/);
  return b.reverse().join("-");
};

export const FUNCDateToString = (date) => {
  var Date = date.getDate();
  var Month = date.getMonth() + 1;
  var Year = date.getFullYear();
  if (Date < 10) Date = "0" + Date;
  if (Month < 10) Month = "0" + Month;
  return Date + "-" + Month + "-" + Year;
};

export const FUNCCheckDateDmy = (input) => {
  var pattern = /^\d{2}-\d{2}-\d{4}$/;
  return pattern.test(input);
};
