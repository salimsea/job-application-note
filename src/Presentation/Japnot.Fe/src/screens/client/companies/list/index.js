import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionTable from "./parts/SectionTable";
import { useHistory } from "react-router-dom";

const CompanyList = () => {
  const history = useHistory();
  return (
    <LayoutClient
      page="Data Companies"
      breadcrumb={[{ name: "Data Companies", navigate: "" }]}
    >
      <button
        onClick={() => history.push("/company/add")}
        className="btn btn-success mb-3"
      >
        <i className="fa fa-plus mr-1" /> Add Company
      </button>
      <SectionTable />
    </LayoutClient>
  );
};

export default CompanyList;
