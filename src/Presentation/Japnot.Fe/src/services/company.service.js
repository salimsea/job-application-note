import { instanceAuth } from "src/utils";

class CompanyService {
  getAll() {
    return instanceAuth.get("/company/GetCompanies");
  }
  getById(id) {
    return instanceAuth.get(`/company/GetCompanyById?id=${id}`);
  }
  add(data) {
    return instanceAuth.post("/company/CompanyAdd", data);
  }
  edit(data) {
    return instanceAuth.put("/company/CompanyEdit", data);
  }
  delete(id) {
    return instanceAuth.delete(`/company/CompanyDelete?companyId=${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CompanyService();
