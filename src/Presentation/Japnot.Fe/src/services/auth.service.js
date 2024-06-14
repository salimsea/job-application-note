import { instance } from "src/utils/instance";

class AuthService {
  login(data) {
    return instance.post("/auth/login", data);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
