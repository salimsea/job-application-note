import { instanceAuth } from "src/utils";

class UserService {
  getInfoUser() {
    return instanceAuth.get("/user/GetInfoUser");
  }

  getAll() {
    return instanceAuth.get("/user/GetUsers");
  }
  getById(id) {
    return instanceAuth.get(`/user/GetUserById?id=${id}`);
  }
  add(data) {
    return instanceAuth.post("/user/UserAdd", data);
  }
  edit(data) {
    return instanceAuth.put("/user/UserEdit", data);
  }
  delete(id) {
    return instanceAuth.delete(`/user/UserDelete?userId=${id}`);
  }
  editProfile(data) {
    return instanceAuth.put("/user/UserProfileEdit", data);
  }

  getByStatus(status) {
    return instanceAuth.get(`/usr/GetUserByStatus?status=${status}`);
  }
  activate(data) {
    return instanceAuth.post("/usr/userActivate", data);
  }
  deactivate(data) {
    return instanceAuth.post("/usr/userDeactivate", data);
  }
  changePassword(data) {
    return instanceAuth.post("/usr/UserPasswordChange", data);
  }

  getMenus() {
    return instanceAuth.get("/usr/getMenus");
  }
  getApplTasksByUserId(data) {
    return instanceAuth.get("/usr/GetApplTasksByUserId", data);
  }
  delegateMenu(data) {
    return instanceAuth.post("/usr/DelegateMenu", data);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
