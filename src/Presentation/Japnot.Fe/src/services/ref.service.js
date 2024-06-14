import { instanceAuth } from "src/utils";

class RefService {
  getRoles() {
    return instanceAuth.get("/ref/GetRoles");
  }
  getTypeWorkDay() {
    return instanceAuth.get("/ref/GetTypeWorkDay");
  }
  getTypeWorkPlace() {
    return instanceAuth.get("/ref/GetTypeWorkPlace");
  }
  getTypeUserCompany() {
    return instanceAuth.get("/ref/GetTypeUserCompany");
  }
  getStatusCompany() {
    return instanceAuth.get("/ref/GetStatusCompany");
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RefService();
